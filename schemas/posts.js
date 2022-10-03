const mongoose = require("mongoose");

const postSchemas = new mongoose.Schema({
    user     : {
        type    : String,
        required: true,
    },
    password : {
        type    : String,
        required: true,
    },
    createdAt: {
        type   : Date,
        default: Date.now
    },
    title    : {
        type    : String,
        required: true,
    },
    content  : {
        type    : String,
        required: true
    }
});

module.exports = mongoose.model("Post", postSchemas);