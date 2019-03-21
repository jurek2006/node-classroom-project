const Course = require("../models/course");

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
