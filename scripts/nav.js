const downBtn = document.querySelector(".fa-angle-down");
const upBtn = document.querySelector(".fa-angle-up");
const wrapper = document.querySelector(".wrapper");
const allParagraphs = document.querySelectorAll(".paragraph");
const contentCont = document.querySelector(".content-container");
const compassIco = document.querySelector(".compass-needle");
const signIco = document.querySelector(".sign-table");
const kayakIco = document.querySelector(".kayak-oar");
const goDownButton = document.querySelector(".fa-angle-down");
const goUpButton = document.querySelector(".fa-angle-up");

goDownButton.style.left = window.innerWidth / 2 + "px";
goDownButton.style.top = window.innerHeight + "px";
goUpButton.style.left = window.innerWidth / 2 + "px";
goUpButton.style.bottom = window.innerHeight - wrapper.offsetHeight + "px";

console.log(window.innerHeight);
console.log(wrapper.offsetHeight);

const icoAnimationTime = 2000;

let parVisiblity = [false, false, false];

//EVENT LISTENERS
wrapper.addEventListener("scroll", () => {
  textAnimation();
});

window.addEventListener("resize", () => {
  goDownButton.style.left = window.innerWidth / 2 + "px";
  goDownButton.style.top = window.innerHeight + "px";
  goUpButton.style.left = window.innerWidth / 2 + "px";
  goUpButton.style.bottom = window.innerHeight - wrapper.offsetHeight + "px";
});

downBtn.addEventListener("click", () => {
  smoothScroll(".content-container", 2000);
});

upBtn.addEventListener("click", () => {
  smoothScroll(".intro", 2000);
});

compassIco.addEventListener("mouseover", () => {
  preformAnimation(compassIco, "compass-needle-animated", icoAnimationTime);
});

signIco.addEventListener("mouseover", () => {
  preformAnimation(signIco, "sign-table-animated", icoAnimationTime);
});

kayakIco.addEventListener("mouseover", () => {
  preformAnimation(kayakIco, "kayak-oar-animated", icoAnimationTime);
});

//FUNCTIONS
//
//function to animate smooth scroll effect
function smoothScroll(target, duartion) {
  target = document.querySelector(target);
  const targetPosition = target.getBoundingClientRect().top;
  const startPosition = wrapper.scrollTop;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOut(timeElapsed, startPosition, targetPosition, duartion);
    wrapper.scrollTo(0, run);
    if (timeElapsed < duartion) requestAnimationFrame(animation);
  }

  function easeInOut(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

//animate "hop effect" with opacity change on text
function textAnimation() {
  if (
    wrapper.scrollTop >= allParagraphs[0].offsetTop + 60 &&
    parVisiblity[0] === false
  ) {
    parVisiblity[0] = true;
    allParagraphs[0].classList.toggle("par-hidden");
  } else if (
    wrapper.scrollTop >= allParagraphs[1].offsetTop + 60 &&
    parVisiblity[1] === false
  ) {
    parVisiblity[1] = true;
    allParagraphs[1].classList.toggle("par-hidden");
  } else if (
    wrapper.scrollTop >= allParagraphs[2].offsetTop + 60 &&
    parVisiblity[2] === false
  ) {
    parVisiblity[2] = true;
    allParagraphs[2].classList.toggle("par-hidden");
  }
}

function preformAnimation(elementToAnimate, animationName, animationTime) {
  if (!elementToAnimate.classList.contains(animationName)) {
    elementToAnimate.classList.toggle(animationName);
    setTimeout(() => {
      elementToAnimate.classList.remove(animationName);
    }, animationTime);
  }
}
