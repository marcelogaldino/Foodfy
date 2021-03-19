const recipes = document.querySelectorAll('.recipe')
const button = document.querySelectorAll('.title p')
const ingredientList = document.querySelector('#ingredient-list')
const prepareList = document.querySelector('#prepare-list')
const infoList = document.querySelector('#info-list')

for (const recipe of recipes) {
    recipe.addEventListener('click', () => {
        const recipeId =  recipe.getAttribute('id')
        
        window.location.href = `/recipes/${recipeId}`
          
    })
}

for (const btn of button) {
    btn.addEventListener('click', () => {
        const buttonId = btn.getAttribute('id') 
        
        if(btn.innerHTML === 'ESCONDER') {
            btn.innerHTML = 'MOSTRAR'
        } else {
            btn.innerHTML = 'ESCONDER'
        }
        
        if(buttonId === 'ingredient' && btn.innerHTML === 'MOSTRAR') {
            ingredientList.style.display = 'none'
        } else if (buttonId === 'ingredient' && btn.innerHTML === 'ESCONDER') {
            ingredientList.style.display = 'block'
        }

        if(buttonId === 'prepare' && btn.innerHTML === 'MOSTRAR') {
            prepareList.style.display = 'none'
        } else if (buttonId === 'prepare' && btn.innerHTML === 'ESCONDER') {
            prepareList.style.display = 'block'
        }


        if(buttonId === 'info' && btn.innerHTML === 'MOSTRAR') {
            infoList.style.display = 'none'
        } else if (buttonId === 'info' && btn.innerHTML === 'ESCONDER') {
            infoList.style.display = 'block'
        }
    })
}


function addIngredient() {
    const ingredients = document.querySelector(".ingredients");
    const fieldContainer = document.querySelectorAll(".itemIngredient");

    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;

    // Deixa o valor do input vazio
    newField.children[0].value = "";
    ingredients.appendChild(newField);
}

function addPreparation() {
    const preparation = document.querySelector(".preparation");
    const fieldContainer = document.querySelectorAll(".itemPrepare");
    
    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;

    // Deixa o valor do input vazio
    newField.children[0].value = "";
    preparation.appendChild(newField);
}

const classAddIngredient = document.querySelector(".add-ingredient")

if(classAddIngredient) {
    document
        .querySelector(".add-ingredient")
        .addEventListener("click", addIngredient);
}

const classAddPreparation = document.querySelector(".add-preparation")

if(classAddPreparation) {
    document
        .querySelector(".add-preparation")
        .addEventListener("click", addPreparation);
}

// CONFIRM DELETE

const formDelete = document.querySelector('#form-delete')

if(formDelete) {
    formDelete.addEventListener('submit', event => {
        const confirmation = confirm('Deseja deletar?')
    
        if(!confirmation) {
            event.preventDefault()
        }
    })
}

// PAGINATION

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if(firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage) {
            if(oldPage && currentPage - oldPage > 2) {
                pages.push('...')
            }

            if(oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
    }
    return pages
}

function createPagination(pagination) {
    const search = pagination.dataset.search
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total


    const pages = paginate(page, total)

    let elements = ''
    
    for (const page of pages) {
        if(String(page).includes('...')) {
            elements += `<span>${page}</span>`
        } else {
            if(search) {
                elements += `<a class="links-page" href="?page=${page}&search=${search}">${page}</a>`
            } else {
                elements += `<a class="links-page" href="?page=${page}">${page}</a>`
            }
        }

    }
    
    pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if(pagination) {
    createPagination(pagination)
}

const PhotosUpload = {
    input: "",
    preview: document.querySelector('.photos-preview'),
    uploadLimit: 5,
    files: [],
    handleFileInput(event) {
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if (PhotosUpload.hasLimite(event)) return

        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })
        
        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    hasLimite(event) {
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input

        if (fileList.length > uploadLimit) {
            alert(`Envie no maximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        const divPhoto = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == 'photo') {
                divPhoto.push(item)
            }
        })

        const totalPhoto = fileList.length + divPhoto.length
        if(totalPhoto > uploadLimit) {
            alert(`Voce atingiu o limite maximo de ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }
    
        return false
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"

        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    },
    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode

        if (photoDiv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"]')
            if (removedFiles) {
                removedFiles.value += `${photoDiv.id},`
            }
        }

        console.log(photoDiv)

        photoDiv.remove()
    }
}

