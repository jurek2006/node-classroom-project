const { readJsonFile, saveJsonFile } = require('../utils/fileSystemUtils');
const uuidv4 = require('uuid/v4');

module.exports = class Contact {
    constructor(id, firstName, lastName) {
        this.id = id || uuidv4();
        this.firstName = firstName;
        this.lastName = lastName;
    }

    save() {
        const contactToSave = this;

        // 1. read contacts list from file
        // 2.
        // if contactToSave doesn't have id or contact with given id doesn't exist (find)
        // > append contact to contact list
        // else > replace contact in the list with new values
        // 3. save contacts list to file

        return Contact.getContacts()
            .then(contactsList => {
                if (
                    !contactToSave.id ||
                    (contactToSave.id &&
                        !contactsList.find(
                            contact => contact.id === contactToSave.id
                        ))
                ) {
                    console.log('zapis');
                    return Contact.saveContacts([
                        ...contactsList,
                        contactToSave
                    ]);
                } else if (
                    contactToSave.id &&
                    contactsList.find(
                        contact => contact.id === contactToSave.id
                    )
                ) {
                    // if exists contact with given id
                    console.log('już jest');
                    const updatedList = contactsList.map(contact =>
                        contact.id === contactToSave.id
                            ? contactToSave
                            : contact
                    );
                    return Contact.saveContacts(updatedList);
                }
            })
            .catch(err => {
                return err;
            });
    }

    static getContacts() {
        // gets all contacts, returns promise which resolves to an array of contact objects
        // if error in reading json resolves to empty array
        return readJsonFile('contacts.json', 'data')
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
                return [];
            });
    }

    static saveContacts(arrayOfContacts) {
        return saveJsonFile(arrayOfContacts, 'contacts.json', 'data');
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
};
