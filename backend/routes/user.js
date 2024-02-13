const express = require('express');
const bcrypt = require('bcrypt');
const { signupBody, signinBody, updateBody } = require('../types');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { Account } = require('../models/Account');
const secretKey = process.env.SECRET_KEY;

router.get('/', authMiddleware, (req, res) => {
    res.send("Route -> api/v1/user")
});

router.post('/signup', async (req, res) => {
    try {
        const { success } = signupBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: "Email already taken / Incorrect inputs"
            })
        }

        const userExists = await User.findOne({ 
            username: req.body.username
        })
        if (userExists) {
            return res.status(411).json({
                message: "Email already taken/Incorrect inputs"
            })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            username: req.body.username,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })

        if (user) {
            let userId = user._id.toString(); // this is to convert "new object('lkjflsajf')"" -> 'lkjflsajf'

            const token = jwt.sign({
                userId : userId
            }, process.env.SECRET_KEY);
            
            // creating an account for the user 
            await Account.create({
                userId: user._id,
                balance: 1 + Math.random() * 10000
            })
            res.json({
                message: "User created successfully",
                token: token
            })
        } else {
            res.json({message: "Failed to Create User"});
        }

    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});   
    }
});


router.post('/signin', async (req, res) => {
    try {
        const {success} = signinBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            })
        }

        const userExists = await User.findOne({username: req.body.username});
        if (!userExists) {
            return res.status(411).json({
                message: "User does not exist"
            })
        }

        const checkPassword = await bcrypt.compare(req.body.password, userExists.password);
        if (checkPassword) {
            let token = jwt.sign({
                userId: userExists.username,
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                token: token
            })
        } else {
            return res.status(411).json({
                message: "Password is incorrect"
            })
        }
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
});


router.put('/update', authMiddleware, async (req, res) => {
    try {
        let {success} = updateBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: "Error while updating information"
            })
        }
        await User.updateOne({username: req.userId}, req.body);
        // this req.body is a json object which contains the updated info, so updateOne query will update the necessary fields
        res.json({message: "Updated successfully"});
    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
});

router.get('/bulk', async (req, res) => {
    try {
        const filter = req.query.filter || ""; 
        // if filter is empty then all users are fetched
        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter
                }
            }, {
                lastName: {
                    "$regex": filter
                }
            }]
        })

        return res.json({
            user: users.map((user) => {
                return {
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    _id: user._id
                }
            })
        })

    } catch (err) {
        console.log(err);
        res.json({message: "Api Call Failed"});
    }
});
module.exports = router;