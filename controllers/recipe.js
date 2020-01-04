const data = require("../data.json")
const fs = require("fs")

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

    console.log("POST")


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
    const { id } = req.params 
    const keys = Object.keys(data.recipes)
    
    
    if (keys.indexOf(id) != id) return res.send("Recipe not found")

    const recipe = {
        ...data.recipes[id],
        id
    }


    res.render("admin/recipes/edit", { item: recipe })
}

exports.put = function(req, res) {
    const { id } = req.body

    let { recipe_image, title, author, ingredients, prepare, further_information } = req.body

    const recipe = {
        recipe_image,
        title,
        author,
        ingredients,
        prepare,
        further_information
    }

    data.recipes[id] = recipe


    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file ERROR")

        res.redirect("recipes")

    })

}

exports.delete = function(req, res) {
    const { id } = req.body

    data.recipes.pop(data.recipes[id])

   

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Write file error")
        }

        res.redirect("/admin/recipes")
    })

}