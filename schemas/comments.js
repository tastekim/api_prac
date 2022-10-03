const mongoose = require("mongoose");

const commentSchemas = new mongoose.Schema({
    postId : {
        type    : String,
        required: true
    },
    user   : {
        type    : String,
        required: true,
    },
    createdAt: {
        type    : Date,
        required: false
    },
    comment: {
        type    : String,
        required: true
    }
});

module.exports = mongoose.model("Comment", commentSchemas);