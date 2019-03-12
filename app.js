const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const routes = require("./routes/routes");
const notFoundController = require("./controllers/notFound404");

//static serve resources from public folder
app.use(express.static(path.resolve("public")));
app.use((req, res, next) => {
    // pass url of current site to ejs views by app.locals (can be accessed in ejs as locals.path)
    app.locals.path = req.originalUrl;
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.use(notFoundController);

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
