const express = require('express');
const path = require('path');
const connectDB = require('./db/dbUtils');
const { register } = require('./callbacks/puts');
const { login, checkLogin, getProfile } = require('./callbacks/posts');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = 4000;
app.use(express.static(path.resolve(__dirname, '../frontend/assets')));

app.get('/', (req, res) => {res.sendFile(path.resolve(__dirname, '../frontend/index.html'));});
app.get('/reg', (req, res) => {res.sendFile(path.resolve(__dirname, '../frontend/register.html'));});
app.get('/forgot', (req, res) => {res.sendFile(path.resolve(__dirname, '../frontend/forgot.html'));});
app.get('/dashboard', (req, res) => {res.sendFile(path.resolve(__dirname, '../frontend/dashboard.html'));});

app.put('/register', (req, res) => {register(req, res);});
app.post('/login', (req, res) => {login(req, res);});
app.post('/checkLoginStatus', (req, res) => {checkLogin(req, res);});
app.post('/profile', (req, res, next) => {checkLogin(req, res, next)}, (req, res) => {getProfile(req, res);});

start();
async function start(){
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}