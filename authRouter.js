const Router = require('express')
const router = new Router()
const controller = require('./authController')
const { check } = require('express-validator')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль1 должен быть больше 4 символов и не более 10").isLength({min: 4, max: 10}),
] , controller.registration)
router.post('/login', controller.login)
// router.get('/users',  roleMiddleware(["ADMIN"]), controller.getUsers)
router.get('/users', controller.getUsers)
router.get('/users/:id', controller.getUser)
router.get('/', (req,res) =>  res.send("hello"))

module.exports = router