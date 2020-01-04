const server = require("express")
const data = require("./data.json")
const recipes = require("./data")

const recipe = require("./controllers/recipe.js")

const routes = server.Router()


routes.get("/admin/recipes", recipe.index) // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipe.create)
routes.get("/admin/recipes/:id", recipe.show)
routes.get("/admin/recipes/:id/edit", recipe.edit)


routes.post("/admin/recipes", recipe.post) // Criar uma receita
routes.put("/admin/recipes", recipe.put) // Editar uma receita
routes.delete("/admin/recipes", recipe.delete)

routes.get("/", function(req, res) {
    res.render("home", { items: data.recipes })
})

routes.get("/about", function(req, res) {
    res.render("about")
})

routes.get("/recipes/:index", function(req, res) {
    const dataRecipes = data.recipes
    const recipeIndex = req.params.index
    
    if ( recipeIndex >= dataRecipes.length) {
        res.send("Recipe not found :(")
    } else if ( dataRecipes.indexOf(recipeIndex) ) {
            res.render("recipes", { item: dataRecipes[recipeIndex] })
        }
})


module.exports = routes