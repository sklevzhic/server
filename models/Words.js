const {Schema, model} = require("mongoose")

const Word = new Schema({
    rus: {type: String, unique: true, required: true},
    eng: {type: String, required: true},
    lesson: {type: Number, required: false},
    errors: {type: Number, required: false},
    correctly: {type: Number, required: false},
    level: {type: String, required: false},
})

module.exports = model('Word', Word)