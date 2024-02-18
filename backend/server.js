const express = require("express");
const path = require("path");
const fileReaderAsync = require("./fileReader");
const fileWriterAsync = require("./fileWriter");
const pizzaPath = path.join(`${__dirname}/pizzas.json`);
const allergenPath = path.join(`${__dirname}/allergens.json`);
// const mongoose = require("mongoose");
// const Order = require("./model/Order.js");
// const Pizza = require("./model/Pizza.js");

// mongoose.connect(
  
// );

// const db = mongoose.connection;
// const collection = db.collection("orders");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 9001;
const orders = [];

// Pizza.create({
//   name: ["Diavola", "Margherita"],
// });

// app.post('/order', (req, res) => {
//     const order = req.body;

//     // Create a new user instance based on the Mongoose model
//     const newOrder = new Order({ 
//         name: order.name,
//         email: order.email,
//     } );

//     // Save the user data to MongoDB
//     newOrder.save((err, user) => {
//         if (err) {
//             console.error('Error saving data to MongoDB:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             console.log('Data saved to MongoDB:', user);
//             res.json({ success: true });
//         }
//     });
// });
app.post('/order', async (req, res, next) => {
    const order = req.body;
    order.createdAt = Date.now();
    try {
      const saved = await Order.create(order);
      return res.json(saved._id);
    } catch (error) {
      return next(error);
    }
  
  });

// app.post("/order", (req, res) => {
//   const order = req.body;

//   // Insert data into MongoDB
//   collection.insertOne(order, (err, result) => {
//     if (err) {
//       console.error("Error inserting data into MongoDB:", err);
//       res.status(500).json({ error: "Internal Server Error" });
//     } else {
//       console.log("Data inserted into MongoDB:", result.ops[0]);
//       res.json({ success: true });
//     }
//   });
// });

app.get("/", (req, res) => {
  res.redirect(301, "/pizza/list");
});

app.get("/pizza/list", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.get("/api/pizza", async (req, res) => {
  const pizzasJSON = JSON.parse(await fileReaderAsync(pizzaPath));
  // console.log(pizzasJSON.pizzas)
  res.send(JSON.stringify(pizzasJSON.pizzas));
});

app.get("/api/allergen", async (req, res) => {
  const allergensJSON = JSON.parse(await fileReaderAsync(allergenPath));
  // console.log(allergensJSON)
  res.send(JSON.stringify(allergensJSON.allergens));
});

app.get("/api/order", async (req, res) => {
  res.json(orders);
});

app.post("/api/order", async (req, res) => {
  const body = req.body;
  body.id = orders.length + 1;
  orders.push(body);
  res.json(body);
});

app.use("/public/", express.static(`${__dirname}/../frontend/public`));

app.listen(port, () => console.log(`http://127.0.0.1:${port}`));
