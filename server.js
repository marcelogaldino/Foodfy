const express = require("express")
const nunjucks = require("nunjucks")

const server = express()

server.use(express.static("public"))

server.set("view engine", "html")

nunjucks.configure("views", {
    express: server
})

server.get("/", function(req, res) {
    res.render("home")
})

server.get("/about", function(req, res) {
    res.render("about")
})

server.get("/recipes", function(req, res) {
    res.render("recipes")
})

server.listen(3000, function(req, res) {
    console.log("server is running")
})