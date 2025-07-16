const btnNavClose = document.querySelector(".btn-mobile-nav-close");
const navBar = document.querySelector(".nav");
const btnNavOpen = document.querySelector(".btn-mobile-nav-open");
const btnHireMe = document.querySelector(".btn-hire-me");
const header = document.querySelector(".header");
const navLinks = [...document.querySelectorAll(".nav-link")];
const btnAbout = document.querySelector(".btn-about");
const section1 = document.querySelector(".section--1");
const sections = document.querySelectorAll(".section");
// Opening and closing nav for mobile size screens
const togglingNav = function (e) {
  navBar.classList.toggle("mobile-nav");
  btnNavClose.classList.toggle("hidden");
  btnNavOpen.classList.toggle("hidden");
};

//When mouse hover over some specific element
const navMouseEnter = function (e) {
  if (e.target.classList.contains("nav-link")) {
    navLinks.forEach((link) => link.classList.add("non-active"));
    e.target.classList.remove("non-active");
  }
};

//When mouse leave the specific element
const navMouseLeave = function (e) {
  if (e.target.classList.contains("nav-link")) {
    navLinks.forEach((link) => link.classList.remove("non-active"));
  }
};

//Smooth scrollong by click their respective btns
const scrollTo = function (sectionNum) {
  document
    .querySelector(`.section--${sectionNum}`)
    .scrollIntoView({ behavior: "smooth" });
};

header.addEventListener("click", function (e) {
  btnMobile = e.target.closest(".btn-mobile");
  if (btnMobile?.classList.contains("btn-mobile")) togglingNav(e);
});
navBar.addEventListener("mouseover", navMouseEnter);
navBar.addEventListener("mouseout", navMouseLeave);

navBar.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    scrollTo(e.target.dataset.nav);
    togglingNav(e);
  }
});
btnAbout.addEventListener("click", function (e) {
  scrollTo("2");
});

btnHireMe.addEventListener("click", function () {
  scrollTo("5");
});

const stickyNav = function () {
  const handleIntersect = function (entries, observer) {
    [entry] = entries;
    if (entry.isIntersecting) {
      header.classList.remove("sticky-nav");
    } else {
      header.classList.add("sticky-nav");
    }
  };

  const options = {
    root: null,
    rootMargin: "-94px",
    threshold: 0,
  };
  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(section1);
};
stickyNav();

const movingAnimation = function () {
  const handleAnimation = function (entries, observe) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section-hidden");
    console.log(entry.target);
  };

  const observer = new IntersectionObserver(handleAnimation, {
    root: null,
    threshold: 0.2,
  });

  sections.forEach((section) => observer.observe(section));
};
movingAnimation();
