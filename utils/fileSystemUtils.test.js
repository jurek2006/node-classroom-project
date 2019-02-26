const expect = require('expect');
const fileSystemUtils = require('./fileSystemUtils');

describe('fileSystemUtils', () => {
    describe('readJsonFile', () => {
        it('read and parse json file', () => {
            return fileSystemUtils
                .readJsonFile('contacts.json', 'data')
                .then(data => {
                    console.log(data);
                    expect(Array.isArray(data)).toBeTruthy();
                    expect(data.length).toBe(2);
                    expect(data).toContainObject({
                        id: '1',
                        firstName: 'Jurek',
                        lastName: 'Skowron'
                    });
                    expect(data).toContainObject({
                        id: '2',
                        firstName: 'Franek',
                        lastName: 'Dolas'
                    });
                });
        });

        it("throws error when file doesn't exists", () => {
            return expect(
                fileSystemUtils.readJsonFile('notExisting.json', 'data')
            ).rejects.toBeTruthy();
        });

        it('throws error if file is not proper JSON', () => {
            return expect(
                fileSystemUtils.readJsonFile('notProper.json', 'data')
            ).rejects.toBeTruthy();
        });
    });
});
