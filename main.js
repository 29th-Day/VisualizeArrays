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
    number.title = `Y: ${Math.floor(grid.childElementCount / parseInt(rows.value))}, X: ${grid.childElementCount % rows.value}`;

    e.appendChild(number);

    grid.appendChild(e);

    if (grid.childElementCount > parseInt(rows.value) * parseInt(cols.value))
    {
        rows.value = parseInt(rows.value) + 1;
    }
}

function removeElement() {
    grid.removeChild(grid.lastChild);

    rows.value = Math.ceil(grid.childElementCount / parseInt(cols.value));
}

function fill() {
    n = parseInt(rows.value) * parseInt(cols.value);

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

function changeCols() {
    grid.style.gridTemplateColumns = `repeat(${cols.value}, 50px)`;
}

fill();
