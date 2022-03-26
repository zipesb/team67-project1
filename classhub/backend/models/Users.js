const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    classes: {
        type: Array,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
}) 

const UserModel = mongoose.model("users", UserSchema);
module.exports= UserModel;