const menuIcon = document.querySelector(".header__hamburger-icon");
const closeIcon = document.querySelector(".header__close-icon");
const mobileNav = document.querySelector(".header__content-wrapper--mobile");

menuIcon.addEventListener("click", () => {
  menuIcon.style.display = "none";
  closeIcon.style.display = "block";
  mobileNav.style.display = "block";
});

closeIcon.addEventListener("click", () => {
  menuIcon.style.display = "block";
  closeIcon.style.display = "none";
  mobileNav.style.display = "none";
});

window.addEventListener("resize", () => {
  const { innerWidth } = window;

  if (innerWidth > 599) {
    menuIcon.style.display = "none";
    closeIcon.style.display = "none";
    mobileNav.style.display = "none";
  } else if (mobileNav.style.display === "none") {
    menuIcon.style.display = "block";
  }
});
