const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("../config/database");
const skillsRouter = require("../router/skills");
const helpRouter = require("../router/help");
const commentRouter = require("../router/comment");
require('dotenv').config();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/", skillsRouter);
app.use("/", helpRouter)
app.use("/", commentRouter)

connectDb().then(() => {
    console.log("Connected to Database Successfully");
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
});