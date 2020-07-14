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
    
    // const recipesPagination = document.querySelector('.pagination a')
    // const sizeInfo = recipesPagination.getBoundingClientRect()
        
    // recipesPagination.addEventListener('click', (e) => {
    //     console.log('click')

    //     window.addEventListener('load', () => {
    //         window.scrollTo({
    //             top: sizeInfo.y,
    //             behavior: 'smooth' 
    //         })
    //     })

        // setTimeout(() => {
            
        //     console.log('scrool')
        // }, 500)
    // })
}

const pagination = document.querySelector(".pagination")

if(pagination) {
    createPagination(pagination)
}


