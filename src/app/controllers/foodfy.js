const Foodfy = require('../models/Foodfy')

exports.index = (req, res) => {
    let { search, page, limit } = req.query

    page = page || 1
    limit = limit || 6
    let offset = limit * (page - 1)

    const params = {
        search,
        page,
        limit,
        offset,
        callback(recipes) {
            const pagination = {
                total: Math.ceil(recipes[0].total / limit),
                page
            }

            return res.render('foodfy/index', { recipes, pagination, search })
        }
    }

    Foodfy.searchRecipes(params)

}

exports.about = (req, res) => {
    return res.render('foodfy/about')
}

exports.recipes = (req, res) => {
    let { search, page, limit } = req.query

    page = page || 1
    limit = limit || 6
    let offset = limit * (page - 1)

    const params = {
        search,
        page,
        limit,
        offset,
        callback(recipes) {
            const pagination = {
                total: Math.ceil(recipes[0].total / limit),
                page
            }

            return res.render('foodfy/recipes', { recipes, pagination, search })
        }
    }

    Foodfy.searchRecipes(params)


    // Foodfy.recipesAndChefName(recipes => {
    //     return res.render('foodfy/recipes', { recipes })
    // })
}

exports.show = (req, res) => {
    const { id } = req.params
    
    Foodfy.show(id, recipe => {
        return res.render('foodfy/recipe', { recipe })
    })
}

exports.chefs = (req, res) => {
    Foodfy.TotalRecipesByChefs(chefs => {
        return res.render('foodfy/chefs', { chefs })
    })
}

exports.search = (req, res) => {
    let { search, page, limit } = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1)

        const params = {
            search,
            page,
            limit,
            offset,
            callback(recipes) {
                const pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
                }

                return res.render('foodfy/search', { recipes, pagination, search })
            }
        }

        Foodfy.searchRecipes(params)
}