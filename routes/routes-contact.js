const express = require("express");
const contactController = require("../controllers/contact");

const router = express.Router();

// CONTACTS - route /contact
router.get("/list", contactController.getContacts);

router.get("/add", contactController.getAddContact);
router.post("/save", contactController.postSaveContact);

router.get("/:id", contactController.getContactEdit);
router.get("/:id/delete", contactController.getContactDelete); //confirm deletion
router.post("/:id/delete", contactController.postContactDelete); //delete contact
module.exports = router;
