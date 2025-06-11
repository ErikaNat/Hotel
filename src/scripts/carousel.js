document.addEventListener("DOMContentLoaded", () => {
  const imgs = document.querySelectorAll(".carousel-image");
  let i = 0;
  setInterval(() => {
    imgs[i].classList.remove("active");
    i = (i + 1) % imgs.length;
    imgs[i].classList.add("active");
  }, 4000);
});