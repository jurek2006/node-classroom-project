const expect = require('expect');
const contactModule = require('./contact');

describe('model contact.js', () => {
    // describe('getContacts()', () => {
    //     it('should get contacts from contacts json file', () => {
    //         return contactModule.getContacts().then(contacts => {
    //             console.log(contacts);
    //             expect(Array.isArray(contacts)).toBeTruthy();
    //             expect(contacts.length).toBe(2);
    //             expect(contacts).toContainObject({
    //                 id: '1',
    //                 firstName: 'Jurek',
    //                 lastName: 'Skowron'
    //             });
    //             expect(contacts).toContainObject({
    //                 id: '2',
    //                 firstName: 'Franek',
    //                 lastName: 'Dolas'
    //             });
    //         });
    //     });
    // });
    describe('saveContacts()', () => {
        return contactModule
            .saveContacts([
                new contactModule(3, 'Grzegorz', 'Brzęczyszczykiewicz')
            ])
            .then(status => {
                expect(status).toBeTruthy();
            });
    });
});
