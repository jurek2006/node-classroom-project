const Contact = require("../models/contact");
const Course = require("../models/course");

exports.getContacts = (req, res, next) => {
    Contact.getContacts().then(contacts => {
        res.render("contact/contact-list", { title: "Contacts", contacts });
    });
};

exports.getAddContact = (req, res, next) => {
    res.render("contact/contact-edit", {
        title: "Add new contact",
        contact: null,
        editMode: null
    });
};

exports.postSaveContact = (req, res, next) => {
    // if id passed we're in updating existing contact, otherwise we're creating and saving new one
    const { firstName, lastName, id } = req.body;
    const contact = new Contact(id, firstName, lastName);
    contact
        .save()
        .then(() => {
            if (id) {
                // updated existing user
                res.redirect(`/contact/${id}`);
            } else {
                // created new user
                res.redirect("/contact/list");
            }
        })
        .catch(err => {
            console.log("Can't save contact.", err);
            res.render("error", {
                title: "Error",
                error: err,
                message: `Can't save contact with id ${id}`
            });
        });
};

exports.getContactEdit = (req, res, next) => {
    const id = req.params.id;
    const editMode = req.query.edit;
    let currentContact;
    Contact.getById(id)
        .then(contact => {
            if (contact) {
                currentContact = contact;
                return Course.getUserCourses(currentContact.id);
            } else {
                throw new Error(`Not found contact with id ${id}`);
            }
        })
        .then(coursesEnrolled => {
            res.render("contact/contact-edit", {
                title: editMode ? "Edit contact" : "Contact details",
                contact: currentContact,
                editMode,
                coursesEnrolled
            });
        })
        .catch(err => {
            res.render("error", {
                title: "Contact not found",
                error: err,
                message: ``
            });
        });
};

exports.getContactDelete = (req, res, next) => {
    // ask about confirmation of contact deletion when the instance of Contact doesn't have any course enrolled
    // iform about prohibition of contact deletion whef for the contact there is at least one course attached
    const id = req.params.id;
    Contact.getById(id)
        .then(contact => {
            if (contact) {
                currentContact = contact;
                return Course.getUserCourses(currentContact.id);
            } else {
                throw new Error(`Not found contact with id ${id}.`);
            }
        })
        .then(coursesEnrolled => {
            if (coursesEnrolled && coursesEnrolled.length > 0) {
                // contact is enrolled to some courses
                res.render("contact/contact-delete-prohibite", {
                    title: "Can not delete contact",
                    contact: currentContact,
                    coursesEnrolled
                });
            } else {
                // contact is not enrolled to any course
                res.render("contact/contact-delete-confirm", {
                    title: "Confirm delete contact",
                    contact: currentContact
                });
            }
        })
        .catch(err => {
            res.render("error", {
                title: "Contact not found",
                error: err,
                message: ``
            });
        });
};

exports.postContactDelete = (req, res, next) => {
    // delete contact with id passed from form
    const { id } = req.body;
    Contact.deleteById(id)
        .then(() => {
            res.redirect("/contact/list");
        })
        .catch(err => {
            res.render("error", {
                title: "Can't delete contact",
                error: err,
                message: ``
            });
        });
};
