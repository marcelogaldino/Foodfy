const modal__overlay = document.querySelector(".modal__overlay")
const clicks = document.querySelectorAll(".click")

for (let click of clicks) {
    click.addEventListener("click", function() {
        const imageName = click.getAttribute("id")
        const descImage = click.querySelector("h4").innerHTML
        const descAuthor = click.querySelector("p").innerHTML
        modal__overlay.classList.add("active")
        modal__overlay.querySelector("img").src=`/assets/${imageName}`
        modal__overlay.querySelector("h4").innerHTML = descImage
        modal__overlay.querySelector("p").innerHTML = descAuthor
    })
}




modal__overlay.querySelector("a").addEventListener("click", function() {
    modal__overlay.classList.remove("active")
})
