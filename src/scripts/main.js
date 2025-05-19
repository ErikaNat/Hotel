const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});

// about container
ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "left",
});

ScrollReveal().reveal(".about__content .section__subheader", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".about__content .section__header", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".about__content .section__description", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".about__btn", {
  ...scrollRevealOption,
  delay: 2000,
});

// room container
ScrollReveal().reveal(".room__card", {
  ...scrollRevealOption,
  interval: 500,
});

// service container
ScrollReveal().reveal(".service__list li", {
  ...scrollRevealOption,
  interval: 500,
  origin: "right",
});

// Our Services Section (titulo + subtitulo + tarjetas)
ScrollReveal().reveal(".services__title-bg", {
  ...scrollRevealOption,
  origin: "left",
});

ScrollReveal().reveal(".services__title", {
  ...scrollRevealOption,
  delay: 300,
});

ScrollReveal().reveal(".services__subtitle", {
  ...scrollRevealOption,
  delay: 600,
});

ScrollReveal().reveal(".service-card", {
  ...scrollRevealOption,
  interval: 200,
  delay: 900,
});

ScrollReveal().reveal(".zoom-container img", {
  distance: "0px",
  opacity: 0,
  duration: 1,
  beforeReveal: (el) => {
    el.classList.add("revealed");
  },
});

window.addEventListener("DOMContentLoaded", () => {
  const imgs = document.querySelectorAll(".carousel-image");
  let i = 0;
  setInterval(() => {
    imgs[i].classList.remove("active");
    i = (i + 1) % imgs.length;
    imgs[i].classList.add("active");
  }, 4000);
});


