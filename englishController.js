const Word = require("./models/Words")
const { validationResult } = require("express-validator")
const User = require("./models/User");
const bcrypt = require("bcrypt");
const Role = require("./models/Role");

class englishController {
    async addWord(req, res) {
        try {
            const {rus, eng, lesson, level} = req.body;
            const newWord = await Word.findOne({rus})
            if (newWord) {
                return res.status(400).json({message: "Такое слово уже существует"})
            }
            const word = new Word({rus, eng, lesson,  errors: 0, correctly: 0, level})
            word.save()
            res.json({ message: "Слово успешно добавлено" })
        } catch (e) {
            res.json({ message: "Ошибка при добавлении слова" })
        }

    }

    async getWords(req, res) {
        try {
            const words = await Word.find()
            res.json(words)
        } catch (e) {
            res.json({ message: "Ошибка при получении слов" })
        }
    }
}

module.exports = new englishController()