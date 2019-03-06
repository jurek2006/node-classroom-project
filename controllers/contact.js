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

exports.getContactDetail = (req, res, next) => {
    const id = +req.params.id;
    Contact.getById(id)
        .then(contact => {
            if (contact) {
                res.render('contact/contact-details', {
                    title: 'Contact details',
                    contact
                });
            } else {
                throw new Error(`Not found contact with id ${id}`);
            }
        })
        .catch(err => {
            res.render('contact/contact-not-found', {
                title: 'Contact not found',
                err
            });
        });
};
