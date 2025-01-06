const User = require('../db/userSchema');
const { failedRes, successRes } = require('../utils');

function register(req, res){
    const { username, email, password } = req.body;

    const newUser = new User({ username, email, password });

    newUser.save()
        .then(() => res.status(201).json(successRes('User registered successfully')))
        .catch(err => res.status(500).json(failedRes(err.message)));
}

module.exports = { register };