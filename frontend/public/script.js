
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
  // console.log(pizzaJSON)
  let allergensList = await fetch(`http://127.0.0.1:9001/api/allergen`);
  let allergensJSON = await allergensList.json();
  // console.log(allergensJSON)

  addEl("div", root, "class", "allergens")
  addEl("div", root, "id", "pizzaJSON")

  const filterBtn = document.querySelector(".filter")
  const allPizzaDiv = document.getElementById("pizzaJSON")
  const allAllergens = document.querySelector(".allergens")
  allPizzaDiv.insertAdjacentHTML("beforeend", `<div id= "pizza">
  <p id="pizzaName">${pizzaJSON[0].name}</p>
  <p id="pizzaDetails">Detalii Pizza</p>
  <p id="pizzaPrice">35,00 lei</p>
  </div>`)
  const pizzas = document.querySelector("#pizza")
  console.log(pizzas)
  allAllergens.insertAdjacentHTML("beforeend", `<div id="allergen">${allergensJSON[0].name}</div> 
  <label class="container">
  <input checked="checked" type="checkbox">
  <div class="checkmark"></div>
</label> `)

  filterBtn.addEventListener("click", (e) => {
    console.log(allAllergens.style.visibility)
    if(allAllergens.style.visibility == "visible"){
      allAllergens.style.transition = "height 0s"
      allAllergens.style.visibility = "hidden"
      allAllergens.style.height = "5vh"
      pizzas.style.marginLeft = "200px"


    } else {
      allAllergens.style.transition = "height 3s"
      allAllergens.style.visibility = "visible"
      allAllergens.style.height = "100vh"
      pizzas.style.marginLeft = "400px"
    }
  })
}

const loadEvent = () => {
  loadAPI();

};

window.addEventListener("load", loadEvent);