
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