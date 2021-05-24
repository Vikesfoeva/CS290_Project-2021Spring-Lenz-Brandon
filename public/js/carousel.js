// Javascript file that outlines the logic for navigating the carousel

// Reference different parts of the carousel
let carousel_track = document.getElementsByClassName("carousel_track")[0];
let images = document.getElementsByClassName("carousel_slide");
let leftButton = document.getElementsByClassName("carousel-control-left")[0];
let rightButton = document.getElementsByClassName("carousel-control-right")[0];
let bubbles = document.getElementsByClassName("indicator");

// Finds how large the image is dynamically for different screensizes
let imageWidth = images[0].getBoundingClientRect().width;

// Setup images in a row for a sliding type of action
function setSlidePosition() {
    for (let index = 0; index < images.length; index++) {
        images[index].style.left = index * imageWidth + 'px';
    };
}

setSlidePosition();


rightButton.addEventListener('click', e => {
    let currentSlide = carousel_track.getElementsByClassName("current_carousel_slide")[0];
    let currentBubble = document.getElementsByClassName("indicator_active")[0];

    let nextSlide;
    let nextBubble;

    let isOnRight = currentSlide == images[images.length - 1];

    if (isOnRight) {
        nextSlide = images[0];
        nextBubble = bubbles[0];
        carousel_track.style.transition = "transform 500ms ease-in";
    } else {
        nextSlide = currentSlide.nextElementSibling;
        nextBubble = currentBubble.nextElementSibling;
        carousel_track.style.transition = "transform 350ms ease-in";
    }

    let moveAmount = nextSlide.style.left;

    carousel_track.style.transform = 'translateX(-' + moveAmount + ')';

    updateCarousel(currentSlide, nextSlide, currentBubble, nextBubble);
});

leftButton.addEventListener('click', e => {
    let currentSlide = carousel_track.getElementsByClassName("current_carousel_slide")[0];
    let currentBubble = document.getElementsByClassName("indicator_active")[0];

    let nextSlide
    let nextBubble;

    let isOnLeft = currentSlide == images[0]

    if (isOnLeft) {
        nextSlide = images[images.length - 1];
        nextBubble = bubbles[bubbles.length - 1];
        carousel_track.style.transition = "transform 500ms ease-in";
    } else {
        nextSlide = currentSlide.previousElementSibling;
        nextBubble = currentBubble.previousElementSibling;
        carousel_track.style.transition = "transform 350ms ease-in";
    }
    let moveAmount = nextSlide.style.left;
    carousel_track.style.transform = 'translateX(-' + moveAmount + ')';

    updateCarousel(currentSlide, nextSlide, currentBubble, nextBubble);
});

function updateCarousel(currentSlide, nextSlide, currentBubble, nextBubble) {
    currentSlide.classList.remove("current_carousel_slide");
    nextSlide.classList.add("current_carousel_slide");

    currentBubble.classList.remove("indicator_active");
    nextBubble.classList.add("indicator_active");
}

function autoScroll() {
    rightButton.click();
}

let interval = window.setInterval(autoScroll, 5000);
