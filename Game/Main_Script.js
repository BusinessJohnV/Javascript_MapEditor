const Field = document.querySelector('.main-field');
const StartBtn = document.querySelector('.generate');
const FWidth = document.querySelector('#width');
const FHeight = document.querySelector('#height');

let generated = false;

StartBtn.addEventListener('click', () => {
    var width = Number(FWidth);
    var height = Number(FHeight);

    if (!generated) {
        for (let i = 0; i < height * width; i++) {
            var div = document.createElement("div");
            div.classList.add("field-square");
            
            Field.append(div);
            generated = true;
        }
    }
});

