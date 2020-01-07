function addIngredient() {
    const ingredients = document.querySelector("#ingredients")
    const fieldContainer = document.querySelectorAll(".add_ingredient")

    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    if (newField.children[0].value == "") return false

    newField.children[0].value = ""
    ingredients.appendChild(newField)

}

document
.querySelector(".insert_ingredient")
.addEventListener("click", addIngredient)


function addPrepare() {
    const prepare = document.querySelector("#prepare")
    const fieldContainer = document.querySelectorAll(".add_prepare")

    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    if (newField.children[0].value == "") return false

    newField.children[0].value = ""
    prepare.appendChild(newField)


}

document
.querySelector(".insert_prepare")
.addEventListener("click", addPrepare)