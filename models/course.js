const uuidv4 = require("uuid/v4");
const { readJsonFile, saveJsonFile } = require("../utils/fileSystemUtils");
const config = require("../config/config");
const Contact = require("./contact");

module.exports = class Course {
    constructor(id, courseName, signedIn) {
        this.id = id;
        this.courseName = courseName;
        this.signedIn = signedIn;
    }

    save() {
        // if Course instace doesn't have defined id - adds new course to the courses file
        // otherwise checks if course with given id exists in file and if so updates the course

        // if course saved/updated properly returns object with course data
        // (if course created object contains id which has been assignet to the course)
        const courseToSave = this;

        return Course.getCourses()
            .then(coursesList => {
                if (!courseToSave.id) {
                    // not given course id - save course with generated new id
                    courseToSave.id = uuidv4();
                    Course.saveCourses([...coursesList, courseToSave]);
                } else if (
                    courseToSave.id &&
                    coursesList.find(course => course.id === courseToSave.id)
                ) {
                    // if exists course with given id - replace it with courseToSave
                    const updatedList = coursesList.map(course =>
                        course.id === courseToSave.id ? courseToSave : course
                    );
                    Course.saveCourses(updatedList);
                } else {
                    // there's no course with given id - error
                    throw new Error("Course with given id doesn't exist");
                }
            })
            .then(() => {
                return courseToSave;
            });
    }

    signInContact(contactToSignInId) {
        const courseToSignContact = this;

        if (!courseToSignContact.signedIn) {
            // if there's no property signedIn for contact adds with contact in array
            courseToSignContact.signedIn = [contactToSignInId];
        } else {
            // check if contac is not already signed in to the course
            if (
                !courseToSignContact.signedIn.find(
                    contactId => contactId == contactToSignInId
                )
            ) {
                // if contact has not been asigned to the course befor - assign it
                courseToSignContact.signedIn = [
                    ...courseToSignContact.signedIn,
                    contactToSignInId
                ];
            } else {
                console.log(
                    `Contact already signedIn to the course. Can't do it again`
                );
                // NEEDED - add some visual infromation for user
            }
        }
    }

    disenrollContact(contactToDisenrollId) {
        const course = this;

        if (
            course.signedIn &&
            course.signedIn.find(
                contactId => contactId === contactToDisenrollId
            )
        ) {
            // if contact enrolled to the course return course with removed contact from array in course's signIn property

            const newSignedIn = course.signedIn.filter(
                contactId => contactId !== contactToDisenrollId
            );
            return new Course(
                course.id,
                course.courseName,
                course.signedIn.filter(
                    contactId => contactId !== contactToDisenrollId
                )
            );
        }

        // if contact not enrolled - throw error
        throw new Error(
            `Contact with id ${contactToDisenrollId} is not enrolled to the course with id ${
                course.id
            }`
        );
    }

    updateSignedContacts() {
        // changes each signedIn contact from id to real contact
        // needed for showing to user
        const course = this;
        if (course.signedIn && course.signInContact.length > 0) {
            // wrap getting contacts data in one promise
            // - resolves when promises for each contact are resolved and then construct updated course object

            return new Promise((resolve, reject) => {
                const promises = course.signedIn.map(contactId => {
                    // wrap Contact.getById in new promise as Contact.getById resolves to undefined when it can't find user
                    // and we want here to return object with id and notFound: true for unfound users (needed to show in view)
                    return new Promise((resolve, reject) => {
                        Contact.getById(contactId).then(contact => {
                            if (contact) {
                                // if contact with given id found
                                resolve(contact);
                            } else {
                                // if contact with given id NOT found
                                resolve({
                                    id: contactId,
                                    notFound: true
                                });
                            }
                        });
                    });
                });

                Promise.all(promises).then(signedInContacts => {
                    // resolve updated course object
                    resolve({
                        ...course,
                        signedIn: signedInContacts
                    });
                });
            });
        }
        // if no one signed to the course just return course object
        return course;
    }

    static getCourses() {
        // gets all courses, returns promise which resolves to an array of Course objects
        // if error in reading json resolves to empty array
        return readJsonFile(
            config.coursesFile.filename,
            config.coursesFile.path
        )
            .then(data => {
                // convert data red from json to array of Course objects
                return data.map(course => {
                    return new Course(
                        course.id,
                        course.courseName,
                        course.signedIn || [] //if property is undefined set empty array
                    );
                });
            })
            .catch(err => {
                console.log(err);
                return [];
            });
    }

    static saveCourses(arrayOfCourses) {
        // returns promise which resolves to true if saving succeed
        return saveJsonFile(
            arrayOfCourses,
            config.coursesFile.filename,
            config.coursesFile.path
        );
    }

    static getById(id) {
        // returns promise which resolves to Course data if succeed and to undefined if fail
        return Course.getCourses()
            .then(courses => {
                const foundCourse = courses.find(course => course.id === id);
                if (!foundCourse) {
                    throw new Error(`Course with id ${id} does not exist`);
                }
                return foundCourse;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }

    static deleteById(id) {
        return Course.getCourses().then(courses => {
            const courseToDelete = courses.find(course => course.id === id);
            if (courseToDelete) {
                return Course.saveCourses(
                    courses.filter(course => course !== courseToDelete)
                );
            } else {
                // not found course with given id
                throw new Error(`Can't find course with id ${id}`);
            }
        });
    }

    static getUserCourses(userId) {
        // returns promise which resolves to array of courses to which contact is enrolled
        return Course.getCourses()
            .then(courses => {
                const foundCourses = courses.filter(course => {
                    return course.signedIn.includes(userId);
                });
                return foundCourses;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }
};
