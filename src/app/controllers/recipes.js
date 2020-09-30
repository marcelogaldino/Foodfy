const Recipe = require('../models/Recipe')
const File = require('../models/File')

exports.index = async (req, res) => {
    try {
        let results = await Recipe.all()
        const recipes = results.rows

        return res.render('admin/recipes/index', { recipes })
    } catch (error) {
        throw new Error(error)
    }
}

exports.create = async (req, res) => {
    try {
        let results = await Recipe.chefs()
        const chefs = results.rows

        return res.render('admin/recipes/create', { chefs })
    } catch (error) {
        throw new Error(error)
    }
}

exports.show = async (req, res) => {
    const { id } = req.params

    try {
        let results = await Recipe.recipesAndChefName(id)
        const recipe = results.rows[0]

        return res.render('admin/recipes/detail', { recipe })
    } catch (error) {
        throw new Error(error)
    }
}

exports.edit = async (req, res) => {
    const { id } = req.params

    try {
        let results = await Recipe.recipesAndChefName(id)
        const recipe = results.rows[0]

        results = await Recipe.chefs()
        const chefs = results.rows

        return res.render('admin/recipes/edit', { recipe, chefs })
    } catch (error) {
        throw new Error(error)
    }
}

exports.post = async (req, res) => {
    const keys = Object.keys(req.body)

    for (const key of keys) {
        if( req.body[key] === '') {
            return res.send("Please fill all the fields!")
        }
    }

    // inserir o file_id e recipe_id na tabela recipe_files

    if(req.files.length == 0) {
        return res.send('Please, send at least one image')
    }

    try {
        await Recipe.create(req.body)

        const filesPromise = req.files.map(file => File.create({...file}))
        await Promise.all(filesPromise)

        return res.redirect('/admin/recipes')
    } catch (error) {
        throw new Error(error)
    }
}

exports.put = async (req, res) => {
    Recipe.update(req.body, () => {
        return res.redirect(`/admin/recipes/${req.body.id}`)
    })

    try {
        await Recipe.update(req.body)

        return res.redirect(`/admin/recipes/${req.body.id}`)
    } catch (error) {
        throw new Error(error)
    }
}

exports.delete = async (req, res) => {
    try {
        await Recipe.delete(req.body.id)

        return res.redirect('/admin/recipes')
    } catch (error) {
        throw new Error(error)
    }
}

