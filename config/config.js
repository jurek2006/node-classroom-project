const env = process.env.NODE_ENV || "development";

const contactsFile = {
    // defines json file where to store contacts
    // path is relative to main project folder, for tests folder is different
    // (to not interfere with stored "real" data)

    filename: "contacts.json",
    path: env === "test" ? "data/test" : "data"
};

module.exports = { contactsFile };
