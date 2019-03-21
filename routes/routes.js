const express = require("express");
const contactController = require("../controllers/contact");
const courseController = require("../controllers/course");

const router = express.Router();

// CONTACTS
router.get("/contact/list", contactController.getContacts);

router.get("/contact/add", contactController.getAddContact);
router.post("/contact/save", contactController.postSaveContact);

router.get("/contact/:id", contactController.getContactEdit);
router.get("/contact/:id/delete", contactController.getContactDelete); //confirm deletion
router.post("/contact/:id/delete", contactController.postContactDelete); //delete contact

// COURSES
router.get("/course/list", courseController.getCourses);

router.get("/course/add", courseController.getAddCourse);
router.post("/course/save", courseController.postSaveCourse);

router.get("/course/:id", courseController.getCoursetEdit);
router.get("/course/:id/delete", courseController.getCourseDelete); //confirm deletion
router.post("/course/:id/delete", courseController.postCourseDelete); //delete course

router.get("/", (req, res, next) => {
    res.render("index", { title: "Index" });
});

module.exports = router;
