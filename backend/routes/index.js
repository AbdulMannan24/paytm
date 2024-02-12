const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const accountRouter = require('./account');

router.use('/user', userRouter);
router.use('/account', accountRouter);

router.get('/', (req, res) => {
    res.send("Request coming to api/v1");
}); 

module.exports = router;