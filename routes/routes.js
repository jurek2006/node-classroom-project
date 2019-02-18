const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/contact/list', userController.getUsers);

router.get('/contact/add', userController.getAddUser);

router.get('/', (req, res, next) => {
    res.render('index', { title: 'Index' });
});

module.exports = router;
