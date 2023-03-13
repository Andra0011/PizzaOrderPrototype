const express = require("express");
const path = require("path");
const fileReaderAsync = require("./fileReader");
const fileWriterAsync = require("./fileWriter");
const pizzaPath = path.join(`${__dirname}/pizzas.json`);
const allergenPath = path.join(`${__dirname}/allergens.json`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 9001;

app.get("/pizza/list", (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.get("/api/pizza", async (req, res) => {
    const pizzasJSON = JSON.parse(await fileReaderAsync(pizzaPath));
    console.log(pizzasJSON.pizzas)
    res.send(JSON.stringify(pizzasJSON.pizzas));
})

app.get("/api/allergen", async (req, res) => {
    const allergensJSON = JSON.parse(await fileReaderAsync(allergenPath));
    console.log(allergensJSON)
    res.send(JSON.stringify(allergensJSON.allergens));
})



app.listen(port, () => console.log(`http://127.0.0.1:${port}/pizza/list`));