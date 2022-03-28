const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    htmlContent: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    editors: {
        type: [String],
        required: true,
    },
    members: {
        type: [String],
        required: true
    },
    resources: {
        type: [{
            id: String,
            filename: String
        }],
        required: false
    }
}) 

const ClassModel = mongoose.model("class", ClassSchema);
module.exports= ClassModel;