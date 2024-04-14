const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { Account } = require('../models/Account');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    try {
        let account = await Account.findOne({userId: req.userId});
        if (account) {
            res.json({balance: account.balance});
        } else {
            res.json({message: 'No account found'});
        }
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
});


router.post('/transfer', authMiddleware, async (req, res) => {
    let session = await mongoose.startSession();
    session.startTransaction();
    try {
        let { amount, to } = req.body;

        let account = await Account.findOne({userId: req.userId}).session(session);
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            res.status(200).json({message: 'Insufficient Balance'});
            return;
        }

        let receiver = await Account.findOne({userId: to}).session(session);
        if (!receiver) {
            await session.abortTransaction();
            res.status(200).json({message: 'User not found'});
            return;
        }

        await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);
        await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

        await session.commitTransaction();

        res.json({message: "success"});
    } catch (err) {
        console.log(err);
        await session.abortTransaction();
        res.status(400).json({message: 'Api Call Failed'});
    }
   
});

module.exports = router;