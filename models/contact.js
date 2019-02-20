const { readJsonFile } = require('../utils/fileSystemUtils');

module.exports = class Contact {
    constructor(id, firstName, lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
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
};
