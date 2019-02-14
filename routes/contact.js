const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('route działa');
});

module.exports = router;
