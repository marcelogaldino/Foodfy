const Chef = require('../models/Chef')

exports.index = (req, res) => {
    Chef.all(chefs => {
        return res.render('admin/chefs/index', { chefs })
    })
}

exports.create = (req, res) => {
    return res.render('admin/chefs/create')
}

exports.show = (req, res) => {
    const { id } = req.params
    
    Chef.show(id, chef => {
        Chef.chefRecipes(id, recipes => {
            Chef.TotalRecipesByChefs(id, recipesByChef => {
                return res.render('admin/chefs/detail', { chef, recipes, recipesByChef })
            })
        })
    })
}

exports.edit = (req, res) => {
    const { id } = req.params

    Chef.show(id, chef => {
        return res.render('admin/chefs/edit', { chef })
    })
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (const key of keys) {
        if( req.body[key] === '') {
            return res.send("Please fill all the fields!")
        }
    }

    Chef.create(req.body, () => {
        return res.redirect('/admin/chefs')
    })
}

exports.put = (req, res) => {
    Chef.update(req.body, () => {
        return res.redirect(`/admin/chefs/${req.body.id}`)
    })
}

exports.delete = (req, res) => {
    const { id } = req.body

    Chef.TotalRecipesByChefs(id, chef => {
        let { total_recipes } = chef

        total_recipes = Number(total_recipes)

        if (chef.total_recipes <= 0) {
            Chef.delete(id, () => {
                return res.redirect('/admin/chefs')
            })
        } else {
            return res.send("You cannot delete a chef that has recipes!!")
        }
    
    })

}

