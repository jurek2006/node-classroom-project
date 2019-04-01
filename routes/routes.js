const express = require("express");
const router = express.Router();
const routesContact = require("./routes-contact");
const routesCourse = require("./routes-course");

const routes = express();
routes.use("/contact", routesContact);
routes.use("/course", routesCourse);

/* index page */
routes.use(
    router.get("/", (req, res, next) => {
        res.render("index", { title: "Index" });
    })
);

/* not found page */
routes.use((req, res, next) => {
    res.status(404).render("notFound404");
});

module.exports = routes;
