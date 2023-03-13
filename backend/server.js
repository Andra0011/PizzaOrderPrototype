const express = require("express");
const path = require("path");
const fileReaderAsync = require("./fileReader");
const fileWriterAsync = require("./fileWriter");
const filePath = path.join(`${__dirname}/pizzas.json`);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 9001;

app.listen(port, () => console.log(`http://127.0.0.1:${port}`));