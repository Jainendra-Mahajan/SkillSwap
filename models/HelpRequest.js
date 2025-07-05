const mongoose = require("mongoose");

const helpRequestSchema = new mongoose.Schema({
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

    askedBy: {
        type: String,
        default: "Anonymous",
    }
}, { timestamps: true })

module.exports = new mongoose.model("HelpRequest", helpRequestSchema);