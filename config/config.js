const env = process.env.NODE_ENV || "development";

// path to store files
// path is relative to main project folder, for tests folder is different
// (to not interfere with stored "real" data)
const path = env === "test" ? "data-test" : "data";

const contactsFile = {
    // defines json file where to store contacts
    // path is relative to main project folder, for tests folder is different
    // (to not interfere with stored "real" data)

    filename: "contacts.json",
    path: path
};

const coursesFile = {
    // defines json file where to store courses
    // path is relative to main project folder, for tests folder is different
    // (to not interfere with stored "real" data)

    filename: "courses.json",
    path: path
};

module.exports = { contactsFile, coursesFile };
