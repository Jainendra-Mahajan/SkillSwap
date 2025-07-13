const express = require("express");
const { default: mongoose } = require("mongoose");
const Comment = require("../models/Comment");
const commentRouter = express.Router();

commentRouter.get("/api/comments/count", async (req, res) => {
    const { postId } = req.query;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid skill ID format" })
    }

    try {
        const comment = await Comment.countDocuments({ postId });

        return res.status(200).json({ data: comment })
    } catch (error) {
        return res.status(500).json({ message: "Error fetching comment", error: error.message })
    }

})

commentRouter.get("/api/comments", async (req, res) => {
    const { postId } = req.query;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid skill ID format" })
    }

    try {
        const comment = await Comment.find({ postId });

        if (comment.length > 0) {
            return res.status(200).json({ data: comment });
        }
        else {
            return res.status(404).json({ message: "No Comments Found" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Error fetching comment", error: error.message })

    }
})


commentRouter.post("/api/comments", async (req, res) => {
    const { postId, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid post ID format" })
    }

    if (!comment || comment.length < 5) {
        return res.status(400).json({ message: "Comment Length cannot be less than 5 Characters" })
    }

    try {
        const newComment = new Comment({ postId, comment });
        await newComment.save();

        return res.status(201).json({ message: "Comment Added Successfully", data: newComment })

    } catch (error) {
        return res.status(500).json({ message: "Error Adding a Comment", error: error.message })
    }
})

module.exports = commentRouter;