const mongoose = require("mongoose");

const skillPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [5, "Title must be at least 5 characters long"]
    },
    tag: {
        type: String,
        required: [true, "Tag is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [10, "Description must be at least 10 characters"]
    },
    likes: {
        type: Number,
        default: 0
    },

    postedBy: {
        type: String,
        default: "Anonymous"
    }
}, { timestamps: true });

module.exports = mongoose.model("SkillPost", skillPostSchema);