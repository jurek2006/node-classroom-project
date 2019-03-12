const expect = require("expect");
const fileSystemUtils = require("./fileSystemUtils");

describe("fileSystemUtils", () => {
    describe("readJsonFile", () => {
        it("should read and parse data from json file", () => {
            return fileSystemUtils
                .readJsonFile(
                    "preparedContacts.json",
                    "data-test/fileSystemUtils-test"
                )
                .then(data => {
                    expect(Array.isArray(data)).toBeTruthy();
                    expect(data.length).toBe(3);
                    expect(data).toContainObject({
                        id: "c5fc9029-9e38-4c68-b851-8ef3a034f7e9",
                        firstName: "Franek",
                        lastName: "Francieszek"
                    });
                    expect(data).toContainObject({
                        id: "f5224122-f919-42fa-9545-40ea2879b4cd",
                        firstName: "Grzegorz",
                        lastName: "Wrona"
                    });
                    expect(data).toContainObject({
                        id: "8a0aa097-da53-4498-a1cb-7f727441bb1e",
                        firstName: "Adam",
                        lastName: "Małysz"
                    });
                });
        });

        it("should reject when file doesn't exists", () => {
            return expect(
                fileSystemUtils.readJsonFile(
                    "notExisting.json",
                    "data-test/fileSystemUtils-test"
                )
            ).rejects.toBeTruthy();
        });

        it("should reject if file is not proper JSON", () => {
            return expect(
                fileSystemUtils.readJsonFile(
                    "notProper.json",
                    "data-test/fileSystemUtils-test"
                )
            ).rejects.toBeTruthy();
        });
    });

    describe("saveJsonFile", () => {
        const objectToSave = {
            first: "sthFirst",
            bool: true,
            value: 123
        };
        it("should write object to json file in existing directory and then properly read data from the file", () => {
            const file = {
                filename: "test.json",
                path: "data-test/fileSystemUtils-test"
            };
            return fileSystemUtils
                .saveJsonFile(objectToSave, file.filename, file.path)
                .then(result => {
                    // expect status true if saving succeed
                    expect(result).toBeTruthy();
                })
                .then(() => {
                    // read and parse data from saved file
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
                })
                .then(() => {
                    // delete created file
                    return fileSystemUtils.deleteFile(file.filename, file.path);
                });
        });

        it("should reject if directory to save does not exist", () => {
            return expect(
                fileSystemUtils.saveJsonFile(
                    objectToSave,
                    "test.json",
                    "not-existing"
                )
            ).rejects.toBeTruthy();
        });
    });
});
