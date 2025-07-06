const express = require("express");
const HelpRequest = require("../models/HelpRequest");
const helpRouter = express.Router();
const { commonFieldsValidation } = require("./validators/commonValidator");
const { validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");

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

helpRouter.get("/api/help/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Help ID format" })
        }

        const helpById = await HelpRequest.findById(id);

        if (helpById) {
            return res.status(200).json({ data: helpById });
        }

        else {
            return res.status(404).json({ message: "Query not found with the specified ID" })
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching Query with Specified Id", error: error.message })
    }
})

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
helpRouter.delete("/api/help/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid help request ID format" });
        }

        const helpById = await HelpRequest.findByIdAndDelete(id);

        if (!helpById) {
            return res.status(404).json({ message: "Help request not found with the specified ID" });
        }

        return res.status(200).json({ message: "Help request deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting help request", error: error.message });
    }
});


helpRouter.patch("/api/help/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid help Id format" })
        }

        const query = await HelpRequest.findById(id);

        if (!query) {
            return res.status(404).json({ message: "Query not found with the specified ID" })
        }

        Object.keys(req.body).forEach(key => {
            query[key] = req.body[key]

        });

        await query.save();
        res.status(200).json({ message: "query updated successfully", data: query });

    } catch (error) {
        res.status(500).json({ message: "Error updating query with Specified Id", error: error.message })
    }
})


module.exports = helpRouter;