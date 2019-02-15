const express = require('express');

const router = express.Router();

router.get('/contact/list', (req, res, next) => {
    res.render('index', { page: 'list' });
});

router.get('/contact/add', (req, res, next) => {
    res.render('index', { page: 'add contact' });
});

router.get('/', (req, res, next) => {
    res.render('index', { page: '\\' });
});

module.exports = router;
