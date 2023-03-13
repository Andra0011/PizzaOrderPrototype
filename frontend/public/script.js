
const addEl = (
    type,
    parent,
    atr1,
    atr1Name,
    atr2,
    atr2Name,
    atr3,
    atr3Name
  ) => {
    let el = document.createElement(type);
    if (atr1 != undefined) el.setAttribute(atr1, atr1Name);
    if (atr2 != undefined) el.setAttribute(atr2, atr2Name);
    if (atr3 != undefined) el.setAttribute(atr3, atr3Name);
    if (parent != undefined) parent.appendChild(el);
    return el;
  };

// document.querySelector("body").insertAdjacentHTML("beforeend", `<div id = "root"></div>`);
const rootElement = document.querySelector("#root");

const loadAPI = async () => {
    let pizzaList = await fetch("/api/pizza");
    let pizzaJSON = pizzaList.json();
    console.log(pizzaJSON)
}

const loadEvent = () => {
    loadAPI();
    addEl("div", root, "id", "pizzaJSON")

};

window.addEventListener("load", loadEvent);