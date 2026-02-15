const Field = document.querySelector('.main-field');
const StartBtn = document.querySelector('.generate');
const FWidth = document.querySelector('#width');
const FHeight = document.querySelector('#height');
const FSquare = document.querySelector('.field-square');

let generated = false;

StartBtn.addEventListener('click', () => {
    var width = Number(FWidth.value);
    var height = Number(FHeight.value);

    generateField(width, height);
});

Field.addEventListener('click', (e) => {
    changeFieldType(e.target);
});

function generateField(width, height) {
    if (!generated) {
        for (let i = 0; i < height * width; i++) {
            var div = document.createElement("div");
            div.classList.add("field-square");
            div.classList.add("grass");
            
            Field.append(div);
            generated = true;
        }
    }
}

function changeFieldType(square) {
    if (square.classList.contains('grass')) {
        square.classList.remove('grass');
        square.classList.add('road');
    }
    else if (square.classList.contains('road')) {
        square.classList.remove('road');
        square.classList.add('water');
    }
    else if (square.classList.contains('water')) {
        square.classList.remove('water');
        square.classList.add('grass');
    }
}
