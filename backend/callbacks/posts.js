const User = require("../db/userSchema");
const { failedRes,successRes } = require("../utils");

async function login(req, res){
    const { email, password, captcha } = req.body;
    if(!email || !password){
        return res.status(400).json(failedRes('Please enter all fields'));
    }
    // Check if user exists
    const user = await User.findOne({
        email: email
    });
    if(!user){
        return res.status(400).json(failedRes('User does not exist'));
    }
    // Validate password
    if(password !== user.password){
        return res.status(400).json(failedRes('Invalid credentials'));
    }
    return res.status(200).json(successRes('Login successful'));
}