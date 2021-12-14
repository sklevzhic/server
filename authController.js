const User = require("./models/User")
const Role = require("./models/Role")
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator")
var jwt = require('jsonwebtoken');
const { secret } = require("./config")

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            user.save()
            res.json({ message: "Пользователь успешно зарегистрирован" })
        } catch (e) {

        }
    }
    async login(req, res) {
        try {
            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if (!candidate) {
                return res.status(400).json({message: "Пользователь с таким логином не найден"})
            }

            const validPassword = bcrypt.compareSync(password, candidate.password)
            if (!validPassword) {
                return res.status(400).json({message: "Пользователь с таким логином не найден"})
            }
            const token = generateAccessToken(candidate._id, candidate.roles)
            return res.json({token, id: candidate._id})
        } catch (e) {
            res.json({message: "fatal error"})
        }
    }
    async getUser(req, res) {
        try {
            const user = await User.findById(req.params.id).exec();
            res.json({id: user._id, username: user.username})
        } catch (e) {

        }
    }
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {

        }
    }
}

module.exports = new authController()