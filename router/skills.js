const express = require("express");
const SkillPost = require("../models/SkillPost");
const { default: mongoose } = require("mongoose");
const skillsRouter = express.Router();
const { commonFieldsValidation } = require("./validators/commonValidator");
const { validationResult } = require("express-validator");


//Fetch all the skills
skillsRouter.get("/api/skills", async (req, res) => {

    try {
        const skillPosts = await SkillPost.find();
        res.status(200).json({ data: skillPosts });

    } catch (error) {
        res.status(500).json({ message: "Error Fetching Skills", error: error.message })
    }
});


//Fetch Skills by Id;
skillsRouter.get("/api/skills/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid skill ID format" })
        }

        const skillById = await SkillPost.findById(id);

        if (skillById) {
            return res.status(200).json({ data: skillById });
        }

        else {
            return res.status(404).json({ message: "Skill not found with the specified ID" })
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching skills with Specified Id", error: error.message })
    }
})

skillsRouter.post("/api/skills", commonFieldsValidation, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, tag, description } = req.body;
    try {

        const newSkill = new SkillPost({ title, tag, description });
        await newSkill.save();

        res.status(201).json({ message: "Skill Added Successfully!", skill: newSkill })
    }

    catch (error) {
        res.status(500).json({ message: "Error Adding a Skill", error: error.message })
    }
});


skillsRouter.delete("/api/skills/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid skill ID format" })
        }

        const skillById = await SkillPost.findByIdAndDelete(id);

        if (!skillById) {
            return res.status(404).json({ message: "Skill not found with the specified ID" })
        }

        return res.status(200).json({ message: "Post Deleted Successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error Deleting skills with Specified Id", error: error.message })
    }
})


skillsRouter.patch("/api/skills/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid skill ID format" })
        }

        const skill = await SkillPost.findById(id);

        if (!skill) {
            return res.status(404).json({ message: "Skill not found with the specified ID" })
        }

        Object.keys(req.body).forEach(key => {
            skill[key] = req.body[key]

        });

        await skill.save();
        res.status(200).json({ message: "Skill updated successfully", data: skill });

    } catch (error) {
        res.status(500).json({ message: "Error updating skills with Specified Id", error: error.message })
    }
})
module.exports = skillsRouter;