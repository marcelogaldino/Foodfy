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
    preview: document.querySelector('.photos-preview'),
    uploadLimit: 5,
    handleFileInput(event) {
        const { files: fileList } = event.target

        if (PhotosUpload.hasLimite(event)) return

        Array.from(fileList).forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })
    },
    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = () => alert('remover foto')

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    hasLimite(event) {
        const { uploadLimit } = PhotosUpload
        const { files: fileList } = event.target

        if (fileList.length > uploadLimit) {
            alert(`Envie no maximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }
        return false
    },
    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"

        return button
    }
}

