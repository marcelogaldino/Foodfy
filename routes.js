const server = require("express")
const recipes = require("./data")

const recipe = require("./controllers/recipe.js")

const routes = server.Router()


routes.get("/admin/recipes", recipe.index) // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipe.create)
routes.get("/admin/recipes/:id", recipe.show)
routes.get("/admin/recipes/:id/edit", recipe.edit)


routes.post("/admin/recipes", recipe.post)

routes.get("/", function(req, res) {
    res.render("home", { items: recipes })
})

routes.get("/about", function(req, res) {
    res.render("about")
})

routes.get("/recipes/:index", function(req, res) {
    const dataRecipes = recipes
    const recipeIndex = req.params.index
    
    if ( recipeIndex >= dataRecipes.length) {
        res.send("Recipe not found :(")
    } else if ( dataRecipes.indexOf(recipeIndex) ) {
            res.render("recipes", { item: dataRecipes[recipeIndex] })
        }
})


module.exports = routes