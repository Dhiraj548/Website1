const express = require('express');
const path = require('path');
const connectDB = require('./db/dbUtils');
const { register } = require('./callbacks/puts');

const app = express();
app.use(express.json());

const port = 3000;
app.use(express.static(path.resolve(__dirname, '../frontend/assets')));

app.get('/', (req, res) => {res.sendFile(path.resolve(__dirname, '../frontend/index.html'));});
app.get('/reg', (req, res) => {res.sendFile(path.resolve(__dirname, '../frontend/register.html'));});
app.get('/forgot', (req, res) => {res.sendFile(path.resolve(__dirname, '../frontend/forgot.html'));});

app.put('/register', (req, res) => {register(req, res);});
app.post('/login', (req, res) => {login(req, res);});

start();
async function start(){
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}