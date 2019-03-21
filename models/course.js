const uuidv4 = require("uuid/v4");
const { readJsonFile, saveJsonFile } = require("../utils/fileSystemUtils");
const config = require("../config/config");

module.exports = class Course {
    constructor(id, courseName, lastName) {
        this.id = id;
        this.courseName = courseName;
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

    static getCourses() {
        // gets all courses, returns promise which resolves to an array of course objects
        // if error in reading json resolves to empty array
        return readJsonFile(
            config.coursesFile.filename,
            config.coursesFile.path
        )
            .then(data => {
                return data;
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
                return courses.find(course => course.id === id);
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
};
