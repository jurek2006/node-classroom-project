const uuidv4 = require("uuid/v4");
const { readJsonFile, saveJsonFile } = require("../utils/fileSystemUtils");
const config = require("../config/config");

module.exports = class Contact {
    constructor(id, firstName, lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    save() {
        // if Contact instace doesn't have defined id - adds new contact to the contacts file ()
        // otherwise checks if contact with given id exists in file and if so updates the contact

        // if contact saved/updated properly returns object with user data
        // (if user created object contains id which has been assignet to the user)
        const contactToSave = this;

        return Contact.getContacts()
            .then(contactsList => {
                if (!contactToSave.id) {
                    // not given contact id - save contact with generated new id
                    contactToSave.id = uuidv4();
                    Contact.saveContacts([...contactsList, contactToSave]);
                } else if (
                    contactToSave.id &&
                    contactsList.find(
                        contact => contact.id === contactToSave.id
                    )
                ) {
                    // if exists contact with given id - replace it with contactToSave
                    const updatedList = contactsList.map(contact =>
                        contact.id === contactToSave.id
                            ? contactToSave
                            : contact
                    );
                    Contact.saveContacts(updatedList);
                } else {
                    // there's no contact with given id - error
                    throw new Error("Contact with given id doesn't exist");
                }
            })
            .then(() => {
                return contactToSave;
            });
    }

    static getContacts() {
        // gets all contacts, returns promise which resolves to an array of Contact objects
        // if error in reading json resolves to empty array
        return readJsonFile(
            config.contactsFile.filename,
            config.contactsFile.path
        )
            .then(data => {
                // convert data red from json to array of Course objects
                return data.map(contact => {
                    return new Contact(
                        contact.id,
                        contact.firstName,
                        contact.lastName
                    );
                });
            })
            .catch(err => {
                console.log(err);
                return [];
            });
    }

    static saveContacts(arrayOfContacts) {
        // returns promise which resolves to true if saving succeed
        return saveJsonFile(
            arrayOfContacts,
            config.contactsFile.filename,
            config.contactsFile.path
        );
    }

    static getById(id) {
        // returns promise which resolves to Contact data if succeed and to undefined if fail
        return Contact.getContacts()
            .then(contacts => {
                return contacts.find(contact => contact.id === id);
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }

    static deleteById(id) {
        return Contact.getContacts().then(contacts => {
            const contactToDelete = contacts.find(contact => contact.id === id);
            if (contactToDelete) {
                return Contact.saveContacts(
                    contacts.filter(contact => contact !== contactToDelete)
                );
            } else {
                // not found contact with given id
                throw new Error(`Can't find contact with id ${id}`);
            }
        });
    }
};
