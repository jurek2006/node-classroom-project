const express = require("express");
const courseController = require("../controllers/course");

const router = express.Router();

// COURSES - route /course
router.get("/list", courseController.getCourses);

router.get("/add", courseController.getAddCourse);
router.post("/save", courseController.postSaveCourse);

router.post("/disenroll/", courseController.postDisenroll); // disenroll contact from course

router.get("/:id", courseController.getCoursetEdit);
router.get("/:id/delete", courseController.getCourseDelete); //confirm deletion
router.post("/:id/delete", courseController.postCourseDelete); //delete course

router.get("/:id/signIn", courseController.getSignInView); // show view with contacts signed in to the course and possible to sign in
router.get("/:id/signIn/:contactId", courseController.getSignIn); // sign contact with contactId to the course with id

module.exports = router;
