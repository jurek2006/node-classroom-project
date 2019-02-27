const expect = require('expect');
const fileSystemUtils = require('./fileSystemUtils');

describe('fileSystemUtils', () => {
    describe('readJsonFile', () => {
        it('should read and parse json file', () => {
            return fileSystemUtils
                .readJsonFile('contacts.json', 'data')
                .then(data => {
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

        it("should throw error when file doesn't exists", () => {
            return expect(
                fileSystemUtils.readJsonFile('notExisting.json', 'data')
            ).rejects.toBeTruthy();
        });

        it('should throw error if file is not proper JSON', () => {
            return expect(
                fileSystemUtils.readJsonFile('notProper.json', 'data')
            ).rejects.toBeTruthy();
        });
    });

    describe('saveJsonFile', () => {
        const objectToSave = {
            first: 'sthFirst',
            bool: true,
            value: 123
        };
        it('should write object to json file in existing directory', () => {
            const file = {
                filename: 'test.json',
                path: 'data'
            };
            return fileSystemUtils
                .saveJsonFile(objectToSave, file.filename, file.path)
                .then(result => {
                    expect(result).toBeTruthy();
                })
                .then(() => {
                    return fileSystemUtils.readJsonFile(
                        file.filename,
                        file.path
                    );
                })
                .then(readData => {
                    // verify if data red from file is the same as objectToSave
                    expect(readData).toBeDefined();
                    expect(JSON.stringify(readData)).toBe(
                        JSON.stringify(objectToSave)
                    );
                });
        });

        it('should return error if directory to save does not exist', () => {
            return expect(
                fileSystemUtils.saveJsonFile(
                    objectToSave,
                    'test.json',
                    'not-existing'
                )
            ).rejects.toBeTruthy();
        });
    });
});
