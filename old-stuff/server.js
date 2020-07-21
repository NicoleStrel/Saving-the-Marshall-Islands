

// If you want to run the website on your local computer/laptop,
// Open a terminal and do type:      node server.js
// and go to http://localhost:8080/


const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var path = require("path");

///////////////////////////////////////////////////

const HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on http://localhost:" + HTTP_PORT);
}

///////////////////////////////////////////////////

app.use(express.static("./public/"));
app.use(bodyParser.urlencoded({ extended: true }));

///////////////////////////////////////////////////

app.use(function (req, res, next) {
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
});

///////////////////////////////////////////////////

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/about.html"));
});

app.get("/atolls", function (req, res) {
    res.sendFile(path.join(__dirname, "/atolls.html"));
});

app.get("/**/*.*", function (req, res) {
    console.log("AAA: " + req.path);
    res.sendFile(path.join(__dirname, req.path));
});

///////////////////////////////////////////////////

app.listen(HTTP_PORT, onHttpStart);

app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname, "/error.html"));
});