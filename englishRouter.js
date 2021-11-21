const Router = require('express')
const router = new Router()
const controller = require('./englishController')
const { check } = require('express-validator')

router.post('/words',  controller.addWord)
router.get('/', (req,res) =>  res.send("helloenglish"))

module.exports = router