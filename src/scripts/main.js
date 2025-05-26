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


ScrollReveal().reveal(".gallery .section__subheader", {
  distance: "50px",
  origin: "left",
  duration: 1200,
  delay: 300,
  opacity: 0,
  scale: 0.9,
});

ScrollReveal().reveal(".gallery .section__header", {
  distance: "50px",
  origin: "left",
  duration: 1500,
  delay: 600,
  opacity: 0,
  scale: 0.9,
});



$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 3 }
    }
  });
});

ScrollReveal().reveal(".habitaciones__heading", {
  distance: "50px",
  origin: "left",
  duration: 1200,
  delay: 300,
  opacity: 0,
  scale: 0.9,
});

ScrollReveal().reveal(".elhotel__title-bg", {
  distance: "50px",
  origin: "left",
  duration: 1200,
  delay: 300,
  opacity: 0,
  scale: 0.9,
});

ScrollReveal().reveal(".elhotel__title", {
  distance: "50px",
  origin: "right",
  duration: 1500,
  delay: 600,
  opacity: 0,
  scale: 0.9,
});

const tituloDinamico = document.querySelector(".service__container .section__header");
const textos = [
  "¡Ya Viene Contigo!",
  "¡Vive la Experiencia!",
  "¡No te lo pierdas!",
  "¡Descúbrelo Aquí!"
];
let indice = 0;

setInterval(() => {
  indice = (indice + 1) % textos.length;
  tituloDinamico.textContent = textos[indice];
}, 4000);  // Cambia cada 4 segundos


const upgradeTitulo = document.querySelector(".upgrade__title");
const textosUpgrade = [
  "Upgrade Disponible",
  "¡Más Comodidad!",
  "¡Beneficios Extra!",
  "¡Vívelo Ahora!"
];
let indiceUpgrade = 0;

setInterval(() => {
  indiceUpgrade = (indiceUpgrade + 1) % textosUpgrade.length;
  upgradeTitulo.textContent = textosUpgrade[indiceUpgrade];
}, 4000); // Cambia cada 4 segundos