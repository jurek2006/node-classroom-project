const expect = require("expect");
const uuidv4 = require("uuid/v4");

const Contact = require("./contact");
const config = require("../config/config");
const { deleteFile } = require("../utils/fileSystemUtils");
const getRandomInt = require("../utils/randomInt").getRandomInt;

describe("model contact.js", () => {
    describe("saveContacts() and getContacts()", () => {
        const contactsToStore = [
            new Contact(uuidv4(), "Adam", "Małysz"),
            new Contact(uuidv4(), "Kamil", "Stoch"),
            new Contact(uuidv4(), "Dawid", "Kubacki")
        ];

        before(() => {
            // before set of tests delete file containing contacts
            return deleteFile(
                config.contactsFile.filename,
                config.contactsFile.path
            );
        });

        it("should store contacts to defined json file", () => {
            return Contact.saveContacts(contactsToStore).then(status => {
                expect(status).toBeTruthy();
            });
        });

        it("should get contacts from defined contacts json file", () => {
            return Contact.getContacts().then(contacts => {
                expect(Array.isArray(contacts)).toBeTruthy();
                expect(contacts.length).toBe(contactsToStore.length);

                // expect to find all defined contacts
                contactsToStore.forEach(contactToFind => {
                    expect(contacts).toContainObject({
                        id: contactToFind.id,
                        firstName: contactToFind.firstName,
                        lastName: contactToFind.lastName
                    });
                });
            });
        });
    });

    describe("Contact.save()", () => {
        const startingContacts = [
            new Contact(uuidv4(), "Adam", "Małysz"),
            new Contact(uuidv4(), "Kamil", "Stoch"),
            new Contact(uuidv4(), "Dawid", "Kubacki")
        ];

        beforeEach(() => {
            // delete file containing contacts
            return deleteFile(
                config.contactsFile.filename,
                config.contactsFile.path
            ).then(() => {
                // populate contacts from startingContacts
                return Contact.saveContacts(startingContacts);
            });
        });
        it("should add and store new contact", () => {
            const contactToAdd = new Contact(null, "Robert", "Lewandowski");

            return contactToAdd
                .save()
                .then(savedContact => {
                    // check if save() returned the same object which was being to saved
                    expect(savedContact).toBe(contactToAdd);
                    return Contact.getContacts();
                })
                .then(contacts => {
                    expect(Array.isArray(contacts)).toBeTruthy();
                    expect(contacts.length).toBe(startingContacts.length + 1);
                    // check there is new stored contact in contacts
                    expect(contacts).toContainObject({
                        firstName: contactToAdd.firstName,
                        lastName: contactToAdd.lastName
                    });
                    // check if pupulated contacts still exists
                    startingContacts.forEach(contactToFind => {
                        expect(contacts).toContainObject({
                            id: contactToFind.id,
                            firstName: contactToFind.firstName,
                            lastName: contactToFind.lastName
                        });
                    });
                });
        });
        it("should update existing random contact", () => {
            // should update random contact from populated contacts with index indexOfElementToUpdate
            const indexOfElementToUpdate = getRandomInt(
                0,
                startingContacts.length
            );
            const contactToUpdateId =
                startingContacts[indexOfElementToUpdate].id;
            const contactToUpdate = new Contact(
                contactToUpdateId,
                "Tom",
                "Hanks"
            );

            return contactToUpdate
                .save()
                .then(savedContact => {
                    // check if save() returned the same object which was being to saved
                    expect(savedContact).toBe(contactToUpdate);
                    return Contact.getContacts();
                })
                .then(contacts => {
                    expect(Array.isArray(contacts)).toBeTruthy();
                    // check if there is the same amount of contacts (as we're updating one)
                    expect(contacts.length).toBe(startingContacts.length);
                    // check there is updated contact in contacts
                    expect(contacts).toContainObject({
                        firstName: contactToUpdate.firstName,
                        lastName: contactToUpdate.lastName
                    });
                    // check if rest of contacts still exist without any changes
                    startingContacts.forEach((contactToFind, index) => {
                        if (index !== indexOfElementToUpdate) {
                            // omit updated contact and check the others
                            expect(contacts).toContainObject({
                                id: contactToFind.id,
                                firstName: contactToFind.firstName,
                                lastName: contactToFind.lastName
                            });
                        }
                    });
                });
        });
    });

    describe("Contact.getById", () => {
        const startingContacts = [
            new Contact(uuidv4(), "Adam", "Małysz"),
            new Contact(uuidv4(), "Kamil", "Stoch"),
            new Contact(uuidv4(), "Dawid", "Kubacki")
        ];

        before(() => {
            // delete file containing contacts
            return deleteFile(
                config.contactsFile.filename,
                config.contactsFile.path
            ).then(() => {
                // populate contacts from startingContacts
                return Contact.saveContacts(startingContacts);
            });
        });

        it("should return proper contact for given id", () => {
            // check if for each populated contact is it possible to get this contact by id
            // as mocha needs get one promise to test async Promise.all used

            // create array of promises - for every contact from populated (in order)
            let promisesArr = [];
            startingContacts.forEach(contact => {
                promisesArr = [...promisesArr, Contact.getById(contact.id)];
            });

            // resolve all promises Contact.getById
            return Promise.all(promisesArr).then(values => {
                // check if for each promise got proper contact data
                values.forEach((returnedContact, index) => {
                    expect(returnedContact).toEqual(startingContacts[index]);
                });
            });
        });
    });
});
