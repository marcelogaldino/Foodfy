const express = require("express")
const nunjucks = require("nunjucks")

const recipes = require("./data")

const server = express()

server.use(express.static("public"))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server
})

server.get("/", function(req, res) {
    res.render("home", { items: recipes })
})

server.get("/about", function(req, res) {
    res.render("about")
})

server.get("/recipes/:index", function(req, res) {
    const dataRecipes = recipes
    const recipeIndex = req.params.index
    
    if ( recipeIndex >= dataRecipes.length) {
        res.send("Recipe not found :(")
    } else {
        if ( dataRecipes.indexOf(recipeIndex) ) {
            res.render("recipes", { item: dataRecipes[recipeIndex] })
        }
    }
    
})

server.listen(3000, function(req, res) {
    console.log("server is running")
})