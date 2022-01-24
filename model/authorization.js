const mongoose = require("mongoose")

const schema = mongoose.Schema({
    username: String,
    role: String,
    token : String
});

module.exports = mongoose.model("auth", schema)