const cards = document.querySelectorAll(".card__item")

for (let card of cards) {
    card.addEventListener("click", function() {
        const arrayPos = card.getAttribute("id")
        // window.location.href = `/recipes/${arrayPos}`
        console.log(typeof(card))
    })
}

