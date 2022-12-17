const User = require('../models/userSchema');
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const userFind = await User.findOne({
            name: username,
            password: password,
        });
        if (!userFind || userFind.length === 0 || userFind === undefined) {
            await res.status(404).json({ message: 'User not found' });
            return;
        }
        next();
    } catch (err) {
        console.log(err, 'error CONTROLLER');
        await res.status(500).json({ message: 'Une erreur est survenue' });
        return;
    }
};

const register = async (req, res, next) => {
    try {
        const username = req.body.username;
        if (!username || username === undefined || username === null) {
            await res.status(404).json({ message: 'Username is required' });
            return;
        }
        const userFind = await User.findOne({
            name: username,
        });
        if (userFind !== null) {
            await res.status(404).json({ message: 'User already exist' });
            return;
        }
        next();
    } catch (err) {
        console.log(err, 'error CONTROLLER');
        await res.status(500).json({ message: 'Une erreur est survenue' });
        return;
    }
};

module.exports = {
    login,
    register,
};
