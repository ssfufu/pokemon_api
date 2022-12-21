const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = { name: username, password: password };

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: accessToken });
    } catch (err) {
        console.log(err, 'error DTO');
        await res.status(500).json({ message: 'Une erreur est survenue' });
        return;
    }
};

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = new User({
            name: username,
            password: password,
        });
        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        console.log(err, 'error DTO');
        await res.status(500).json({ message: 'Une erreur est survenue' });
        return;
    }
};

module.exports = {
    login,
    register,
};
