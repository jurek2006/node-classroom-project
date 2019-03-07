const express = require("express");
const contactController = require("../controllers/contact");

const router = express.Router();

router.get("/contact/list", contactController.getContacts);

router.get("/contact/add", contactController.getAddContact);
router.post("/contact/save", contactController.postSaveContact);

router.get("/contact/:id", contactController.getContactDetail);
router.get("/contact/:id/edit", contactController.getContactEdit);

router.get("/", (req, res, next) => {
    res.render("index", { title: "Index" });
});

module.exports = router;
