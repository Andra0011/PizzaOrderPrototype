
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
  label.textContent = `${allergen.name}`;

  root.appendChild(checkbox);
  root.appendChild(label);

}



let pizzaJSON, allergensJSON
const loadAPI = async () => {
  let pizzaList = await fetch(`http://127.0.0.1:9001/api/pizza`);
  let allergensList = await fetch(`http://127.0.0.1:9001/api/allergen`);
  pizzaJSON = await pizzaList.json();
  allergensJSON = await allergensList.json();

  allergensJSON.forEach(allergen => {
    createAllergensCheckers(allergen);
    const checkbox = document.querySelector(`#${allergen.name}Filter`)

    checkbox.addEventListener("change", () => {
      let checkedArr = [], allergenArr = []
      const pizzasToFilter = document.querySelectorAll(`.${allergen.name}`)
      const allCheckboxes = document.querySelectorAll(".checkboxx")
      const allPizzas = document.querySelectorAll(".pizza")
      allCheckboxes.forEach(checkboxx => {
        if (checkboxx.checked) {
          checkedArr.push(checkboxx.value)
        }
      })

      pizzasToFilter.forEach(pizzaToFilter => {
        pizzaJSON.forEach(pizza => {
          const allergenString = document.querySelector(`#allergenList${pizza.id}`)
          if (pizzaToFilter.id == `Pizza${pizza.id}`) {
            allergenArr = allergenString.textContent.split(", ")
          }
        })
        console.log(allergenArr, checkedArr)
        allPizzas.forEach(pizza => {
          pizza.classList.remove('hidden')
          checkedArr.forEach(checked => {
            if (pizza.classList.contains(checked)) {
              pizza.classList.add('hidden');
            }
          })
        })
      });

      console.log("end");
    })
  });



  addEl("div", root, "id", "pizzaJSON")
  pizzaJSON.forEach(pizza => {
    const allPizzaDiv = document.getElementById("pizzaJSON")
    allPizzaDiv.insertAdjacentHTML("beforeend", `<div id="Pizza${pizza.id}" class="pizza ${allergenIdToDivClasses(pizza.allergens)}">${pizza.name} : </div>`)
    const thatPizza = document.getElementById(`Pizza${pizza.id}`)
    thatPizza.insertAdjacentHTML("beforeend", `<div id="allergenList${pizza.id}">${allergenIdToName(pizza.allergens)}<br/><br/></div>`)
  });



}

const loadEvent = () => {
  loadAPI();
};

window.addEventListener("load", loadEvent);