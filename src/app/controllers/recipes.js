const Recipe = require('../models/Recipe')

exports.index = (req, res) => {
    Recipe.all(recipes => {
        return res.render('admin/recipes/index', { recipes })
    })
}

exports.create = (req, res) => {
    Recipe.chefs(chefs => {
        return res.render('admin/recipes/create', { chefs })
    })
}

exports.show = (req, res) => {
    const { id } = req.params

    Recipe.recipesAndChefName(id, recipe => {
        // console.log(recipe)
        return res.render('admin/recipes/detail', { recipe })
    })
}

exports.edit = (req, res) => {
    const { id } = req.params

    Recipe.recipesAndChefName(id, recipe => {
        Recipe.chefs(chefs => {
            return res.render('admin/recipes/edit', { recipe, chefs })
        })
    })
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (const key of keys) {
        if( req.body[key] === '') {
            return res.send("Please fill all the fields!")
        }
    }

    // let { chef_id } = req.body

    // chef_id = Number(chef_id)

    // const data = {
    //     ...req.body,
    //     chef_id
    // }

    // console.log(typeof(data.chef_id))

    Recipe.create(req.body, () => {
        return res.redirect('/admin/recipes')
    })
}

exports.put = (req, res) => {
    Recipe.update(req.body, () => {
        return res.redirect(`/admin/recipes/${req.body.id}`)
    })
}

exports.delete = (req, res) => {
    Recipe.delete(req.body.id, () => {
        return res.redirect('/admin/recipes')
    })
}

