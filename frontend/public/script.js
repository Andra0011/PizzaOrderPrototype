
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


const loadAPI = async () => {
  let pizzaList = await fetch(`http://127.0.0.1:9001/api/pizza`);
  let pizzaJSON = await pizzaList.json();
  console.log(pizzaJSON)
  addEl("div", root, "id", "pizzaJSON")
  const allPizza = document.getElementById("pizzaJSON")
  allPizza.insertAdjacentHTML("beforeend", `<div>${pizzaJSON[0].name}</div>`)

}

const loadEvent = () => {
  loadAPI();

};

window.addEventListener("load", loadEvent);