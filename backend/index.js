const express = require('express');
const path = require('path');
const connectDB = require('./db/dbUtils');
const { register, addPayReq } = require('./callbacks/puts');
const { login, checkLogin, getProfile, logout, addBirthApplication, getTransactions } = require('./callbacks/posts');
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
app.get('/birthList', (req, res)=> {res.sendFile(path.resolve(__dirname, '../frontend/birthList.html'));})
app.get('/birthApp', (req, res) => {res.sendFile(path.resolve(__dirname, '../frontend/birthApp.html'));});
app.get('/birthCert', (req, res) => {res.sendFile(path.resolve(__dirname, '../frontend/birthCert.html'));});
app.get('/news', (req, res)=> {res.sendFile(path.resolve(__dirname, '../frontend/news.html'));})
app.get('/wallet', (req, res) => {res.sendFile(path.resolve(__dirname, '../frontend/wallet.html'));});
app.get('/addMoney', (req, res)=>{res.sendFile(path.resolve(__dirname, '../frontend/addMoney.html'));});
app.get('/manualAddMoney', (req, res)=>{res.sendFile(path.resolve(__dirname, '../frontend/manualAddMoney.html'));});
app.get('/transactions', (req, res)=>{res.sendFile(path.resolve(__dirname, '../frontend/transactions.html'));});


app.put('/register', (req, res) => {register(req, res);});
app.put('/payreq', (req, res, next)=> {checkLogin(req, res, next)} ,(req, res) => {addPayReq(req, res);});

app.post('/login', (req, res) => {login(req, res);});
app.post('/checkLoginStatus', (req, res) => {checkLogin(req, res);});
app.post('/profile', (req, res, next) => {checkLogin(req, res, next)}, (req, res) => {getProfile(req, res);});
app.post('/logout', (req, res) => {logout(req, res);});
app.post('/birthApp', (req, res, next) => {checkLogin(req, res, next)}, (req, res) => {addBirthApplication(req, res);});
app.post('/transactions', (req, res, next) => {checkLogin(req, res, next)}, (req, res) => {getTransactions(req, res);});

start();
async function start(){
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}