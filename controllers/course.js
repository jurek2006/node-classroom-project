exports.getCourses = (req, res, next) => {
    res.render("course/course-list", { title: "Courses", courses: [] });
};

exports.getAddCourse = (req, res, next) => {
    res.render("course/course-edit", {
        title: "Add new course",
        course: null,
        editMode: null
    });
};
