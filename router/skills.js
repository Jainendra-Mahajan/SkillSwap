const express = require("express");
const SkillPost = require("../models/SkillPost");
const { default: mongoose } = require("mongoose");
const skillsRouter = express.Router();


//Fetch all the skills
skillsRouter.get("/api/skills", async (req, res) => {

    try {
        const skillPosts = await SkillPost.find();
        res.status(200).json(skillPosts);

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



skillsRouter.post("/api/skills", async (req, res) => {
    try {
        const { title, tag, description } = req.body;

        const newSkill = new SkillPost({ title, tag, description });
        await newSkill.save();

        res.status(201).json({ message: "Skill Added Successfully!", skill: newSkill })
    }

    catch (error) {
        res.status(500).json({ message: "Error Adding a Skill", error: error.message })
    }
})
module.exports = skillsRouter;