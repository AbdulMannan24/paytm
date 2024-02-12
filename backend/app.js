const express = require("express");
const connectDB = require("./db");
const app = express();
const port = process.env.PORT || 3000;
const mainRouter = require('./routes/index');
const cors = require("cors");

require('dotenv').config();
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1', mainRouter);

app.get('/', (req, res)=> {
    res.send("Api Server running");
})




app.listen(port, ()=> {
    console.log("Server Started: " + port);
    connectDB();
});