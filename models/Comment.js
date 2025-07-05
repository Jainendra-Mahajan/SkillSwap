const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Types.ObjectId,
        ref: "SkillPost",
        required: true,
    },

    comment: {
        type: String,
        required: true
    },

    postedBy: {
        type: String,
        default: "Anonymous"
    },

    parentId: {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model("Comment", commentSchema);