const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const file = require('./routes/file');

mongoose.connect("mongodb://127.0.0.1:27017/Organisation");
const db = mongoose.connection;

db.on('error', function (err) {
  console.log(err);
});

db.once('open', function () {
  console.log('handshake established')
});


const app = express();
const port = 4500;

// user route
const userRoute = require("./routes/userRoute");
// const fileuploadroute = require("./routes/file-route");



////




app.use("/", userRoute);
app.use('/', file);
app.get('',(req,res)=>{
  return res.json("Rohit Kumar Shukla")
})
app.listen(port, function () {
  console.log("server is running");
});
