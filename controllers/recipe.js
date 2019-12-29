const recipes = require("../data.js")
const fs = require("fs")

const data = require("../data.json")

exports.index = function(req, res) {
    res.render("admin/recipes", { items: data.recipes })
}

exports.create = function(req, res) {
    res.render("admin/recipes/create")
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    
    for (key of keys) {

        if (req.body[key] == "")
            return res.send("Please, fill all the fields")

    }

    const { ingredients, prepare } = req.body

    req.body.ingredients = [ingredients]
    req.body.prepare = [prepare]

    data.recipes.push({
        ...req.body
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err)
            return res.send("Write file ERROR")
    })

    res.redirect("/admin/recipes")
}

exports.show = function(req, res) {
    const { id } = req.params 
    const keys = Object.keys(data.recipes)
    
    
    if (keys.indexOf(id) != id) return res.send("Recipe not found")

    const recipe = {
        ...data.recipes[id],
        id
    }

    res.render("admin/recipes/show", { item: recipe })
    
}

exports.edit = function(req, res) {
    res.send("Marcelog")
}