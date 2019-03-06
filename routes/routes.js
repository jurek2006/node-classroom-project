const express = require('express');
const contactController = require('../controllers/contact');

const router = express.Router();

router.get('/contact/list', contactController.getContacts);

router.get('/contact/add', contactController.getAddContacts);
router.post('/contact/add', contactController.postAddContacts);

router.get('/contact/:id', contactController.getContactDetail);

router.get('/', (req, res, next) => {
    res.render('index', { title: 'Index' });
});

module.exports = router;
