const Course = require("../models/course");
const Contact = require("../models/contact");

exports.getCourses = (req, res, next) => {
    Course.getCourses().then(courses => {
        res.render("course/course-list", {
            title: "Courses",
            courses: courses
        });
    });
};

exports.getAddCourse = (req, res, next) => {
    res.render("course/course-edit", {
        title: "Add new course",
        course: null,
        editMode: null
    });
};

exports.postSaveCourse = (req, res, next) => {
    // if id passed we're in updating existing course, otherwise we're creating and saving new one
    const { courseName, id } = req.body;
    const course = new Course(id, courseName);
    course
        .save()
        .then(() => {
            if (id) {
                // updated existing user
                res.redirect(`/course/${id}`);
            } else {
                // created new user
                res.redirect("/course/list");
            }
        })
        .catch(err => {
            console.log("Can't save course.", err);
            res.render("error", {
                title: "Error",
                error: err,
                message: `Can't save course with id ${id}`
            });
        });
};

exports.getCoursetEdit = (req, res, next) => {
    const id = req.params.id;
    const editMode = req.query.edit;
    Course.getById(id)
        .then(course => {
            if (course) {
                // if course found - it consists contacts in enrolled property - but only contacts' ids
                // use course.updateEnrolledContacts() to update property with contacts real objects or with 'contact id not found' object
                return course.updateEnrolledContacts();
            } else {
                throw new Error(`Not found course with id ${id}`);
            }
        })
        .then(course => {
            // here we got course with updated contacts object in course.enrolled property
            res.render("course/course-edit", {
                title: editMode ? "Edit course" : "Course details",
                course,
                editMode
            });
        })
        .catch(err => {
            res.render("error", {
                title: "Course not found",
                error: err,
                message: ``
            });
        });
};

exports.getCourseDelete = (req, res, next) => {
    // ask about confirmation od course deletion
    const id = req.params.id;
    Course.getById(id)
        .then(course => {
            if (course) {
                res.render("course/course-delete-confirm", {
                    title: "Confirm delete course",
                    course
                });
            } else {
                throw new Error(`Not found course with id ${id}.`);
            }
        })
        .catch(err => {
            res.render("error", {
                title: "Course not found",
                error: err,
                message: ``
            });
        });
};

exports.postCourseDelete = (req, res, next) => {
    // delete course with id passed from form
    const { id } = req.body;
    Course.deleteById(id)
        .then(() => {
            res.redirect("/course/list");
        })
        .catch(err => {
            res.render("error", {
                title: "Can't delete course",
                error: err,
                message: ``
            });
        });
};

exports.getEnrolledInView = (req, res, next) => {
    const id = req.params.id;
    let currentCourse;
    Course.getById(id)
        .then(course => {
            return course.updateEnrolledContacts();
        })
        .then(course => {
            // here we got course with updated contacts object in course.enrolled property
            currentCourse = course;
            return Contact.getContacts();
        })
        .then(contacts => {
            // filter contacts to disable already enrolled in
            // if contacs is enrolled to the course gets property alreadyEnrolled
            currentCourse.enrolled.forEach(enrolledContact => {
                let foundContact = contacts.find(
                    contact => contact.id === enrolledContact.id
                );
                if (foundContact) {
                    foundContact.alreadyEnrolled = true;
                }
            });

            res.render("course/course-enroll", {
                title: "Manage enrolled in the course",
                course: currentCourse,
                contacts: contacts
            });
        })
        .catch(err => {
            res.render("error", {
                title: "Can't enroll contacts in the course",
                error: err,
                message: ``
            });
        });
};

exports.getEnrolled = (req, res, next) => {
    const courseId = req.params.id;
    const contactId = req.params.contactId;
    Course.getById(courseId)
        .then(foundCourse => {
            foundCourse.enrollContact(contactId);
            return foundCourse.save();
        })
        .then(updatedCourse => {
            res.redirect(`/course/${courseId}/enroll`);
        })
        .catch(err => {
            console.log(`Can't enroll in the course with id ${courseId}`);
            res.render("error", {
                title: `Can't enroll in the course with id ${courseId}`,
                error: err,
                message: ``
            });
        });
};

exports.postDisenroll = (req, res, next) => {
    const { courseId, contactId, redirectBackPath } = req.body;
    Course.getById(courseId)
        .then(foundCourse => {
            const courseToSave = foundCourse.disenrollContact(contactId);
            return courseToSave.save();
        })
        .then(updatedCourse => {
            res.redirect(redirectBackPath); //redirects back to given path
        })
        .catch(err => {
            console.log(
                `Can't disenroll contact with id ${contactId} from the course with id ${courseId}`
            );
            res.render("error", {
                title: `Can't disenroll contact with id ${contactId} from the course with id ${courseId}`,
                error: err,
                message: ``
            });
        });
};
