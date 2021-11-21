const Router = require('express')
const router = new Router()
const controller = require('./authController')
const { check } = require('express-validator')

router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль1 должен быть больше 4 символов и не более 10").isLength({min: 4, max: 10}),
] , controller.registration)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)

module.exports = router