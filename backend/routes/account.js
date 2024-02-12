const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Route -> api/v1/account");
});

module.exports = router;