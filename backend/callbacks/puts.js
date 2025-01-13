const Transaction = require('../db/transaction');
const User = require('../db/userSchema');
const { failedRes, successRes } = require('../utils');

function register(req, res){
    const { username, email, password } = req.body;

    const newUser = new User({ username, email, password });

    newUser.save()
        .then(() => res.status(201).json(successRes('User registered successfully')))
        .catch(err => res.status(500).json(failedRes(err.message)));
}

async function addPayReq(req, res) {
    const { paymentType, utr, amount, transactionDate } = req.body;    

    const newTransaction = new Transaction({
        type: paymentType,
        transactionId: utr,
        amount: amount,
        date: transactionDate,
        status: 'pending',
        userId: req.user.id
    });

    try {
        await newTransaction.save();
        await User.findByIdAndUpdate(req.user.id, { $push: { transactions: newTransaction._id } });
        res.status(201).json(successRes('Payment request added successfully'));
    } catch (err) {
        res.status(500).json(failedRes(err.message));
        console.log(err);
        
    }
}

module.exports = { register,addPayReq };