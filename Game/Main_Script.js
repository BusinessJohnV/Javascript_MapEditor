const Field = document.querySelector('.main-field');
const StartBtn = document.querySelector('.generate');
const FWidth = document.querySelector('#width');
const FHeight = document.querySelector('#height');
const FSquare = document.querySelector('.field-square');
const Menu = document.querySelector('.main-menu');
const SavingDialogue = document.querySelector('.save-dialogue');
const SaveBtn = document.querySelector('.map-save');
const MapNameSave = document.querySelector('input[name="map-name-save"]');
const LoadBtn = document.querySelector('.map-load');
const MapNameLoad = document.querySelector('input[name="map-name-load"]');


let generated = false;
let squareWidth = 40;
let squareHeight = 40;

StartBtn.addEventListener('click', () => {
    var width = Number(FWidth.value);
    var height = Number(FHeight.value);

    Menu.classList.remove('main-menu');
    Menu.classList.add('hidden');

    generateField(width, height);
});

Field.addEventListener('click', (e) => {
    changeFieldType(e.target);
});

SaveBtn.addEventListener('click', saveMap);
LoadBtn.addEventListener('click', loadMap);

function generateField(fieldwidth, fieldheight) {
    if (!generated) {
        for (let i = 0; i < Number(fieldheight) * Number(fieldwidth); i++) {
            var div = document.createElement("div");

            div.classList.add("field-square");
            div.classList.add("grass");
            
            Field.append(div);
        }

        SavingDialogue.classList.remove('hidden');

        Field.style.width = squareWidth * Number(fieldwidth);
        Field.style.height = squareHeight * Number(fieldheight);
        generated = true;
    }
}

function changeFieldType(square) {
    if (square.classList.contains('grass')) {
        square.classList.remove('grass');
        square.classList.add('straight_road_horizontal');
    }
    else if (square.classList.contains('straight_road_horizontal')) {
        square.classList.remove('straight_road_horizontal');
        square.classList.add('straight_road_vertical');
    }
    else if (square.classList.contains('straight_road_vertical')) {
        square.classList.remove('straight_road_vertical');
        square.classList.add('curved_road_right_up');
    }
    else if (square.classList.contains('curved_road_right_up')) {
        square.classList.remove('curved_road_right_up');
        square.classList.add('curved_road_left_up');
    }
    else if (square.classList.contains('curved_road_left_up')) {
        square.classList.remove('curved_road_left_up');
        square.classList.add('curved_road_right_down');
    }
    else if (square.classList.contains('curved_road_right_down')) {
        square.classList.remove('curved_road_right_down');
        square.classList.add('curved_road_left_down');
    }
    else if (square.classList.contains('curved_road_left_down')) {
        square.classList.remove('curved_road_left_down');
        square.classList.add('water');
    }
    else if (square.classList.contains('water')) {
        square.classList.remove('water');
        square.classList.add('grass');
    }
}

function saveMap() {
    const name = MapNameSave.value.trim();
    if (!name) {
        alert("Zadej název mapy.");
        return;
    }

    const squares = document.querySelectorAll('.field-square');
    const grid = [];

    squares.forEach(square => {
        const type = [...square.classList].find(cls => cls !== 'field-square');
        grid.push(type);
    });

    const mapData = {
        width: Number(FWidth.value),
        height: Number(FHeight.value),
        grid: grid
    };

    localStorage.setItem("map_" + name, JSON.stringify(mapData));
    alert("Mapa uložena.");
}

function loadMap() {
    const name = MapNameLoad.value.trim();
    if (!name) {
        alert("Zadej název mapy.");
        return;
    }

    const saved = localStorage.getItem("map_" + name);

    if (!saved) {
        alert("Mapa nenalezena.");
        return;
    }

    const mapData = JSON.parse(saved);

    Field.innerHTML = "";
    generated = false;

    FWidth.value = mapData.width;
    FHeight.value = mapData.height;

    generateField(mapData.width, mapData.height);

    const squares = document.querySelectorAll('.field-square');

    squares.forEach((square, index) => {
        square.className = "field-square " + mapData.grid[index];
    });

    Menu.classList.remove('main-menu');
    Menu.classList.add('hidden');

    alert("Mapa načtena.");
}
