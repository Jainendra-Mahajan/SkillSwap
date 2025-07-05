const mongoose = require("mongoose");

const helpRequestSchema = new mongoose.Schema({
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

    askedBy: {
        type: String,
        default: "Anonymous",
    }
}, { timestamps: true })

module.exports = new mongoose.model("HelpRequest", helpRequestSchema);