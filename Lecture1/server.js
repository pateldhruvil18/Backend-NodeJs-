const express = require('express')

const app = express();

//use body=parser for post the data on json formatt
const bodyParser = require('body-parser');

app.use(bodyParser.json());


//routes-get
app.get('/', (req, res) => {
    res.send("hello")
})


//routes-post
app.post("/api/cars", (req, res) => {
    const {name, brand} = req.body; 
    console.log(name);
    console.log(brand);
    res.send("car added successfully");
})

//connection between node and mongoodbCompass
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Cars")
  .then(() => {
    console.log("Connection established");
  })
  .catch((error) => console.log(error));


//listen the port  
app.listen(3000, () => {
    console.log("server running on 3000 port");
})
