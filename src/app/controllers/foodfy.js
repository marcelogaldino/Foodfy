const Foodfy = require('../models/Foodfy')

exports.index = async (req, res) => {
    let { search, page, limit } = req.query

    page = page || 1
    limit = limit || 6
    let offset = limit * (page - 1)

    const params = {
        search,
        page,
        limit,
        offset,
    }

    try {
        let results = await Foodfy.searchRecipes(params)
        const recipes = results.rows
        
        const pagination = {
            total: Math.ceil(recipes[0].total / limit),
            page
        } 

        return res.render('foodfy/index', { recipes, pagination, search })
    } catch (error) {
        throw new Error(error)
    }

}

exports.about = (req, res) => {
    return res.render('foodfy/about')
}

exports.recipes = async (req, res) => {
    let { search, page, limit } = req.query

    page = page || 1
    limit = limit || 6
    let offset = limit * (page - 1)

    const params = {
        search,
        page,
        limit,
        offset,
    }

    try {
        let results = await Foodfy.searchRecipes(params)
        const recipes = results.rows
        
        const pagination = {
            total: Math.ceil(recipes[0].total / limit),
            page
        } 

        return res.render('foodfy/recipes', { recipes, pagination, search })
    } catch (error) {
        throw new Error(error)
    }
}

exports.show = async (req, res) => {
    const { id } = req.params

    try {
        let results = await Foodfy.show(id)
        const recipe = results.rows[0]

        return res.render('foodfy/recipe', { recipe })
    } catch (error) {
        throw new Error(error)
    }
}

exports.chefs = async (req, res) => {
    try {
        let results = await Foodfy.TotalRecipesByChefs()
        const chefs = results.rows

        return res.render('foodfy/chefs', { chefs })
    } catch (error) {
        throw new Error(error)
    }
}

exports.search = async (req, res) => {
    let { search, page, limit } = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1)

        const params = {
            search,
            page,
            limit,
            offset,
        }

        try {
            let results = await Foodfy.searchRecipes(params)
            const recipes = results.rows
            
            const pagination = {
                total: Math.ceil(recipes[0].total / limit),
                page
            } 
    
            return res.render('foodfy/search', { recipes, pagination, search })
        } catch (error) {
            throw new Error(error)
        }
}