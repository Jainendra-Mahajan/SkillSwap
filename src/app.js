const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("../config/database");
require('dotenv').config();
const port = 3000;

app.use(cors());

app.use("/", (req, res) => {
    res.send("Hello World");
})

connectDb().then(() => {
    console.log("Connected to Database Successfully");
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
});