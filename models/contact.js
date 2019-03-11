const { readJsonFile, saveJsonFile } = require("../utils/fileSystemUtils");
const uuidv4 = require("uuid/v4");

module.exports = class Contact {
    constructor(id, firstName, lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    save() {
        // if not contactToSave.id passed - adds new contact
        // otherwise checks if contact with given id exists and if so updates the contact

        // if contact saved/updated properly returns object with user data
        // (if user created object contains id which has been assignet to the user)
        const contactToSave = this;

        return Contact.getContacts()
            .then(contactsList => {
                if (!contactToSave.id) {
                    // not given contact id - create and save new one
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
        // gets all contacts, returns promise which resolves to an array of contact objects
        // if error in reading json resolves to empty array
        return readJsonFile("contacts.json", "data")
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
                return [];
            });
    }

    static saveContacts(arrayOfContacts) {
        return saveJsonFile(arrayOfContacts, "contacts.json", "data");
    }

    static getById(id) {
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
