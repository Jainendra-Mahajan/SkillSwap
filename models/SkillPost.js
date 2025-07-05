const mongoose = require("mongoose");

const skillPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    tag: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
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