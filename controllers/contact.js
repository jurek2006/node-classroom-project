const Contact = require('../models/contact');

exports.getContacts = (req, res, next) => {
    Contact.getContacts().then(contacts => {
        console.log(contacts);
        res.render('contact/contact-list', { title: 'Contacts list' });
    });
};

exports.getAddContacts = (req, res, next) => {
    res.render('contact/contact-add', { title: 'Add contact' });
};
