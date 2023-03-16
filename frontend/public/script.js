
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

let allergenIdToName = (allergensInPizza) => {
  let namesToRet = "";
  for (let i = 0; i < allergensInPizza.length; i++) {
    for (let j = 0; j < allergensJSON.length; j++) {
      if (allergensInPizza[i] == allergensJSON[j].id) {
        namesToRet += `${allergensJSON[j].name}, `
      }
    }
  }
  return namesToRet.slice(0, -2);
}

let allergenIdToDivClasses = (allergensInPizza) => {
  let toRet = ""
  let allergenNamesArr = allergenIdToName(allergensInPizza).split(",");
  allergenNamesArr.forEach(allergen => {
    toRet += `${allergen} `
  })
  return toRet;
}

let createAllergensCheckers = (allergen) => {
  const root = document.getElementById("root");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `${allergen.name}Filter`;
  checkbox.className = "checkboxx"
  checkbox.value = `${allergen.name}`;

  const label = document.createElement("label");
  label.for = `${allergen.name}Filter`;
  label.className = "allergen"
  // label.textContent = `${allergen.name}`;
  
  allAllergens.appendChild(label);
  label.appendChild(checkbox);
  label.innerHTML+=`${allergen.name}`

}


let allAllergens
let pizzaJSON, allergensJSON
const loadAPI = async () => {
  addEl("div", root, "class", "allergens")
  allAllergens = document.querySelector(".allergens")

  let pizzaList = await fetch(`http://127.0.0.1:9001/api/pizza`);
  let allergensList = await fetch(`http://127.0.0.1:9001/api/allergen`);
  pizzaJSON = await pizzaList.json();
  allergensJSON = await allergensList.json();

  allergensJSON.forEach(allergen => {
    createAllergensCheckers(allergen);
    const checkbox = document.querySelector(`#${allergen.name}Filter`)

    checkbox.addEventListener("change", () => {
      let checkedArr = [];
      const allCheckboxes = document.querySelectorAll(".checkboxx")
      const allPizzas = document.querySelectorAll(".pizza")
      allCheckboxes.forEach(checkboxx => {
        if (checkboxx.checked) {
          checkedArr.push(checkboxx.value)
        }
      })

      allPizzas.forEach(pizza => {
        pizza.classList.remove('hidden')
        checkedArr.forEach(checked => {
          if (pizza.classList.contains(checked)) {
            pizza.classList.add('hidden');
          }
        })
      })
      
      console.log("end");
    })
  });

  addEl("div", root, "id", "pizzaJSON")

  pizzaJSON.forEach(pizza => {
    const allPizzaDiv = document.querySelector("#pizzaJSON")

    addEl("div", allPizzaDiv, "id", `Pizza${pizza.id}`, "class", `pizza ${allergenIdToDivClasses(pizza.allergens)}`)
    const thatPizza = document.querySelector(`#Pizza${pizza.id}`)

    addEl("img", thatPizza, "src", `${pizza.image}`)

    addEl("div", thatPizza, "id", `pizzaName${pizza.id}`, "class", "pizzaName");
    const pizzaName = document.querySelector(`#pizzaName${pizza.id}`);
    pizzaName.textContent=`${pizza.name}`

    addEl("div", thatPizza, "id", `pizzaIngredients${pizza.id}`, "class", "pizzaIngredients");
    const pizzaIngredients = document.querySelector(`#pizzaIngredients${pizza.id}`);
    pizzaIngredients.textContent=`${pizza.ingredients.join(", ")}`

    addEl("div", thatPizza, "id", `pizzaPrice${pizza.id}`, "class", "pizzaPrice");
    const pizzaPrice = document.querySelector(`#pizzaPrice${pizza.id}`);
    pizzaPrice.textContent=`${pizza.price} RON`

    const amount = addEl("input", thatPizza, "id", `amount${pizza.id}`);
    amount.value = "0";
    
    const addButton = addEl("button", thatPizza, "data-pizza-id", `${pizza.id}`, "class", "add");
    addButton.textContent = "Add to order";
    addButton.addEventListener("click", handleAddToOrder);

    const removeButton = addEl("button", thatPizza, "data-pizza-id", `${pizza.id}`, "class", "remove");
    removeButton.textContent = "Remove";
    removeButton.style.display = "none";
    removeButton.addEventListener("click", handleRemoveFromOrder);
  });

  const filterBtn = document.querySelector(".filter")
  const allPizzaDiv = document.getElementById("pizzaJSON")
  const pizzas = document.querySelector(".pizza")
  console.log(pizzas)

  filterBtn.addEventListener("click", (e) => {
    console.log(allAllergens.style.visibility)
    if(allAllergens.style.visibility == "visible"){
      allAllergens.style.transition = "height 0s"
      allAllergens.style.visibility = "hidden"
      allAllergens.style.height = "5vh"
      allPizzaDiv.style.marginLeft = "50px"

    } else {
      allAllergens.style.transition = "height 3s"
      allAllergens.style.visibility = "visible"
      allAllergens.style.height = "100vh"
      allPizzaDiv.style.marginLeft = "300px"
    }
  })

  const orderArea = addEl("div", root, "id", "order");
  
}

const loadEvent = () => {
  loadAPI();
};

window.addEventListener("load", loadEvent);

let cart = [];
const handleAddToOrder = (event) => {
  const pizzaId = event.target.getAttribute("data-pizza-id");
  const amount = document.getElementById(`amount${pizzaId}`);

  if(amount.value == 0) {
    return;
  }

  cart.push({
    id: pizzaId,
    amount: amount.value,
  })
  console.log(cart);

  event.target.style.display = 'none';
  document.querySelector(`.remove[data-pizza-id='${pizzaId}']`).style.display = "";
  amount.disabled = true;
}

const handleRemoveFromOrder = (event) => {
  const pizzaId = event.target.getAttribute("data-pizza-id");
  cart = cart.filter(pizza => pizza.id !== pizzaId);
  console.log(cart);

  event.target.style.display = 'none';
  document.querySelector(`.add[data-pizza-id='${pizzaId}']`).style.display = "";
  document.getElementById(`amount${pizzaId}`).disabled = false;
}