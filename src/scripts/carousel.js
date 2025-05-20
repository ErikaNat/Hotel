document.addEventListener("DOMContentLoaded", () => {
  const imgs = document.querySelectorAll(".carousel-image");
  let i = 0;
  setInterval(() => {
    imgs[i].classList.remove("active");
    i = (i + 1) % imgs.length;
    imgs[i].classList.add("active");
  }, 4000);
});

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".room__carousel");
  if (!carousel) return;

  let scrollAmount = 0;
  const scrollStep = 1;
  const scrollSpeed = 30;

  function autoScroll() {
    scrollAmount += scrollStep;
    if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
      scrollAmount = 0;
    }
    carousel.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }

  setInterval(autoScroll, scrollSpeed);
});