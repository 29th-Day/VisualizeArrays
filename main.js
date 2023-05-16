const grid = document.querySelector(".container");

const rows = document.querySelector("#rows")
const cols = document.querySelector("#cols")

function addElement() {
    if (!(grid.childElementCount < parseInt(rows.max) * parseInt(cols.max))) {
        return;
    }

    let e = document.createElement("div");
    e.classList.add("card");
    e.onclick = () => highlight(e);
    e.oncontextmenu = () => resetHighlight(e);
    e.dataset.color = "0";

    let number = document.createElement("abbr");
    number.innerText = grid.childElementCount;
    number.title = `Y: ${Math.floor(grid.childElementCount / rows.value)}, X: ${grid.childElementCount % rows.value}`;

    e.appendChild(number);

    grid.appendChild(e);
}

function removeElement() {
    grid.removeChild(grid.lastChild);
}

function fill() {
    changeRows();
    changeCols();

    n = rows.value * cols.value;

    if (grid.childElementCount < n) {
        for (let i = grid.childElementCount; i < n; i++) {
            addElement();
        }
    } else {
        for (let i = grid.childElementCount; i > n; i--) {
            removeElement();
        }
    }
}

function highlight(card) {
    card.dataset.color = (parseInt(card.dataset.color) + 1) % 6;
}

function resetHighlight(card) {
    card.dataset.color = 0;
    return false;
}

function changeRows() {
    grid.style.gridTemplateRows = `repeat(${rows.value}, 50px)`;
}

function changeCols() {
    grid.style.gridTemplateColumns = `repeat(${cols.value}, 50px)`;

}

fill();
