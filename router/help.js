const express = require("express");
const HelpRequest = require("../models/HelpRequest");
const helpRouter = express.Router();
const { commonFieldsValidation } = require("./validators/commonValidator");
const { validationResult } = require("express-validator");

//Fetch Get all help requests
helpRouter.get("/api/help", async (req, res) => {
    try {
        const helpPosts = await HelpRequest.find();
        if (helpPosts) {
            return res.status(200).json({ data: helpPosts });
        }
        else {
            return res.status(404).json({ message: "No Help Post Available" });
        }

    } catch (error) {
        res.status(500).json({ message: "Error fetching help data", error: error.message })
    }
});

helpRouter.post("/api/help", commonFieldsValidation, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, tag, description } = req.body;

    try {
        const query = new HelpRequest({ title, tag, description });

        await query.save();
        return res.status(201).json({ data: query });

    } catch (error) {
        res.status(500).json({ message: "Error Adding a Query", error: error.message })
    }
})


module.exports = helpRouter;