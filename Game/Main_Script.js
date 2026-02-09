const Field = document.querySelector('.main-field');

var Width = 20;
var Height = 20;

for (let i = 0; i < Height * Width; i++) {
    var div = document.createElement("div");
    div.classList.add("field-square");

    Field.append(div);
}