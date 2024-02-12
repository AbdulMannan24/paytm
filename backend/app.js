const express = require("express");
const connectDB = require("./db");
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.get('/', (req, res)=> {
    res.send("Api Server running");
})


app.listen(port, ()=> {
    console.log("Server Started: " + port);
    connectDB();
});