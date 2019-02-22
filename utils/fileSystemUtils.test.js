const expect = require('expect');
const fileSystemUtils = require('./fileSystemUtils');

describe('fileSystemUtils', () => {
    describe('readJsonFile', () => {
        it('read and parse json file', () => {
            // chcę przetestować czy jest tablicą z dwoma elementami
            // chcę przetestować czy znajdują się poszczególne elementy https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98
            return fileSystemUtils
                .readJsonFile('contacts.json', 'data')
                .then(data => {
                    console.log(data);
                    expect(Array.isArray(data)).toBeTruthy();
                    expect(data.length).toBe(2);
                    expect(data).toEqual(
                        expect.arrayContaining([
                            expect.objectContaining({
                                id: '1',
                                firstName: 'Jurek',
                                lastName: 'Skowron'
                            })
                        ])
                    );
                    expect(data).toEqual(
                        expect.arrayContaining([
                            expect.objectContaining({
                                id: '2',
                                firstName: 'Franek',
                                lastName: 'Dolas'
                            })
                        ])
                    );
                });
        });
    });
});
