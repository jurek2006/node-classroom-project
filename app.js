const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const routes = require("./routes/routes");

//static serve resources from public folder
app.use(express.static(path.resolve("public")));
app.use(bodyParser.urlencoded({ extended: false }));

/* ROUTING */
app.use(routes);

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
