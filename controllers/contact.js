const Contact = require('../models/contact');

exports.getContacts = (req, res, next) => {
    Contact.getContacts().then(contacts => {
        res.render('contact/contact-list', { title: 'Contact list', contacts });
    });
};

exports.getAddContacts = (req, res, next) => {
    res.render('contact/contact-add', { title: 'Add new contact' });
};

exports.postAddContacts = (req, res, next) => {
    const { firstName, lastName } = req.body;
    const contact = new Contact(null, firstName, lastName);
    contact
        .save()
        .then(returned => {
            console.log(returned);
            res.redirect('/contact/list');
        })
        .catch(err => {
            console.log(err);
        });
};
