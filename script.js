const modal = document.querySelector('.modal')
const cards = document.querySelectorAll(".card__items")
const close = document.querySelector("#close__text")

for (let card of cards) {
    card.addEventListener("click", function() {
        const imageName = card.getAttribute("id")
        const name = document.querySelector(".card__name").innerHTML
        const author = document.querySelector(".card__author").innerHTML
        modal.classList.add("active")
        modal.querySelector("img").src=`/assets/${imageName}`
        modal.querySelector(".card__name").innerHTML= name
        modal.querySelector(".card__author").innerHTML= author
    })
}

close.addEventListener("click", function() {
    modal.classList.remove("active")
})
