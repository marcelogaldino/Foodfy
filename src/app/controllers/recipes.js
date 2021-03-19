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
        
        // results = await 

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

        results = await Recipe.files(id)
        let files = results.rows
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render('admin/recipes/edit', { recipe, chefs, files })
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

    if(req.files.length == 0) {
        return res.send('Please, send at least one image')
    }

    try {
        let results = await Recipe.create(req.body)
        const recipeId = results.rows[0].id

        const filesPromise = req.files.map(file => File.create({...file}))
        await Promise.all(filesPromise)
        .then((values) => {
            for(n=0; n < values.length; n++){
              let array = values[n].rows
              for(let file of array){
                File.createFileInsert(file.id, recipeId )
              }
            }
        })

        return res.redirect('/admin/recipes')
    } catch (error) {
        throw new Error(error)
    }
}

exports.put = async (req, res) => {
    const keys = Object.keys(req.body)

    Recipe.update(req.body, () => {
        return res.redirect(`/admin/recipes/${req.body.id}`)
    })

    for (const key of keys) {
        if( req.body[key] === '' && key != "removed_files") {
            return res.send("Please fill all the fields!")
        }
    }

    if(req.files.length != 0) {
        const recipeId = req.body.id

        const filesPromise = req.files.map(file => File.create({...file}))
        await Promise.all(filesPromise)
        .then((values) => {
            for(n=0; n < values.length; n++){
              let array = values[n].rows
              for(let file of array){
                File.createFileInsert(file.id, recipeId )
              }
            }
        })
    }

    if(req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(',')
        const lastIndex = removedFiles.length -1
        removedFiles.splice(lastIndex, 1)

        const removedFilePromise = removedFiles.map(id => File.delete(id))
        await Promise.all(removedFilePromise)
    }

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

