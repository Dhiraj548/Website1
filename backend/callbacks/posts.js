const User = require("../db/userSchema");
const { failedRes, successRes } = require("../utils");
const jwt = require('jsonwebtoken');

async function login(req, res) {
    const { email, password, captcha } = req.body;
    
    if (!email || !password) {
        return res.status(400).json(failedRes('Please enter all fields'));
    }
    // Check if user exists
    const user = await User.findOne({
        email: email
    });
    if (!user) {
        return res.status(400).json(failedRes('User does not exist'));
    }
    // Validate password
    if (password !== user.password) {
        return res.status(400).json(failedRes('Invalid credentials'));
    }
    // Validate captcha

    // if (!captcha || captcha !== 'expected_captcha_value') {
    //     return res.status(400).json(failedRes('Invalid captcha'));
    // }

    const payload = {
        id: user._id,
        email: user.email
    };

    const secret = process.env.SECRET_KEY || 'your_jwt_secret';
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
    return res.status(200).json(successRes('Login successful', { redirectUrl: '/dashboard' }));

}

async function checkLogin(req, res, next) {
    if (!req.cookies || !req.cookies.token) {
        console.log('No token provided');
        
        return logout(req, res, 'Access denied. No token provided.');
    }
    const token = req.cookies.token;

    try {
        const secret = process.env.SECRET_KEY || 'your_jwt_secret';
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        if (typeof next === 'function') {
            next();
        } else {
            res.status(200).json(successRes('Token is valid'));
        }
    } catch (ex) {
        return logout(req, res, 'Invalid token.');
    }
}

async function getProfile(req, res) {
    try {
        const user = await User.findOne({ email: req.user.email }).select('-password -_id');
        if (!user) {
            return res.status(404).json(failedRes('User not found'));
        }
        console.log(user);
        return res.status(200).json({...successRes('Profile fetched successfully'), user: user});
    } catch (error) {
        return res.status(500).json(failedRes(`Error: ${error}`));
    }
}

async function logout(req, res, message) {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });
    let msg = message? failedRes(message) : successRes('Logged out successfully');
    return res.status(200).json({ ...msg, redirectUrl: '/' });
}

module.exports = {
    login,
    checkLogin, 
    getProfile
};