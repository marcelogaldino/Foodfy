const cards = document.querySelectorAll(".card__item")
const recipe = document.querySelector("#recipe")
const prepare = document.querySelector("#prepare")
const information = document.querySelector("#information")

for (let card of cards) {
    card.addEventListener("click", function() {
        const arrayPos = card.getAttribute("id")
        window.location.href = `/recipes/${arrayPos}`
    })
}

recipe.addEventListener("click", function() {
    if (recipe.innerHTML === "ESCONDER") {
        document.querySelector("ul").style.display = "none"
        recipe.innerHTML = "MOSTRAR"    
    } else if (recipe.innerHTML === "MOSTRAR") {
        document.querySelector("ul").style.display = "block"
        recipe.innerHTML = "ESCONDER"
    }
})

prepare.addEventListener("click", function() {
    if (prepare.innerHTML === "ESCONDER") {
        document.querySelector("#preparation").style.display = "none"
        prepare.innerHTML = "MOSTRAR"    
    } else if (prepare.innerHTML === "MOSTRAR") {
        document.querySelector("#preparation").style.display = "block"
        prepare.innerHTML = "ESCONDER"
    }
})

information.addEventListener("click", function() {
    if (information.innerHTML === "ESCONDER") {
        document.querySelector("#info").style.display = "none"
        information.innerHTML = "MOSTRAR"    
    } else if (information.innerHTML === "MOSTRAR") {
        document.querySelector("#info").style.display = "block"
        information.innerHTML = "ESCONDER"
    }
})



