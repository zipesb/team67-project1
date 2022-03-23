const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClassPage = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    content: {
        type: String // Placeholder, since I'm not sure if/how we can store JSX
    }
});

module.exports = mongoose.model('ClassPage', ClassPage);