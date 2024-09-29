const UsersModel = require("../models/users.model");
const jwt = require("jsonwebtoken")

const protect = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        let token
        token = req.headers.authorization.split(" ")[1]
        const decoded = await jwt.verify(token, process.env.JWT__SECRET__KEY)
        req.user = await UsersModel.findById(decoded.id).select("-password")
        next()
    } else {
        res.status(404).send('Not Authorized')
    }
}

module.exports = protect