const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("../config/database");
const skillsRouter = require("../router/skills");
require('dotenv').config();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/", skillsRouter);

connectDb().then(() => {
    console.log("Connected to Database Successfully");
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
});