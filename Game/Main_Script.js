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
const MapNameSelect = document.querySelector('select[name="map-name"]');
const BackToMenuBtn = document.querySelector('.back-to-menu');


let generated = false;

LoadMaps();

StartBtn.addEventListener('click', () => {
    var width = Number(FWidth.value);
    var height = Number(FHeight.value);

    Menu.classList.add('hidden');

    MapNameSave.textContent = "";
    generateField(width, height);
});

Field.addEventListener('click', (e) => {
    changeFieldType(e.target);
});

SaveBtn.addEventListener('click', saveMap);
LoadBtn.addEventListener('click', loadMap);

BackToMenuBtn.addEventListener('click', () => {
    Menu.classList.remove('hidden');
    Field.classList.add('hidden');
    SavingDialogue.classList.add('hidden');

    generated = false;
    LoadMaps();
})

function generateField(fieldwidth, fieldheight) {
    Field.childNodes.forEach(c => c.remove());

    for (let i = 0; i < Number(fieldheight) * Number(fieldwidth); i++) {
        var div = document.createElement("div");

        div.classList.add("field-square", "grass");
        
        Field.append(div);
    }

    Field.style.gridTemplateColumns = 'repeat(' + fieldwidth + ', 1fr)';

    SavingDialogue.classList.remove('hidden');
    Field.classList.remove('hidden');

    Field.style.width = fieldwidth * 40 + 'px';
    Field.style.height = fieldheight * 40 + 'px';
    generated = true;
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
    const name = MapNameSelect.value.trim();
    if (!name) {
        alert("Zadej název mapy.");
        return;
    }

    const saved = localStorage.getItem(name);

    if (!saved) {
        alert("Mapa nenalezena.");
        return;
    }

    const mapData = JSON.parse(saved);
    MapNameSave.value = name;

    Field.innerHTML = "";
    generated = false;

    generateField(mapData.width, mapData.height);

    const squares = document.querySelectorAll('.field-square');

    squares.forEach((square, index) => {
        square.className = "field-square " + mapData.grid[index];
    });

    Menu.classList.add('hidden');

    alert("Mapa načtena.");
}

function LoadMaps() {
    MapNameSelect.length = 1;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.startsWith("map_")) {
            const value = JSON.parse(localStorage.getItem(key));
            
            var opt = document.createElement('option');
            opt.value = key;
            opt.textContent = key;

            console.log(opt);
            console.log(opt.value);

            MapNameSelect.append(opt);
        }
    }
}