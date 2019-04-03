const express = require("express");
const courseController = require("../controllers/course");

const router = express.Router();

// COURSES - route /course
router.get("/list", courseController.getCourses);

router.get("/add", courseController.getAddCourse);
router.post("/save", courseController.postSaveCourse);

router.post("/disenroll/", courseController.postDisenroll); // disenroll contact from course

router.get("/:id", courseController.getCoursetEdit); //course detail & edit
router.get("/:id/delete", courseController.getCourseDelete); //confirm deletion
router.post("/:id/delete", courseController.postCourseDelete); //delete course

router.get("/:id/enroll", courseController.getEnrolledInView); // show view with contacts entolled in the course and possible to enroll
router.get("/:id/enroll/:contactId", courseController.getEnrolled); // enroll contact with contactId to the course with id

module.exports = router;
