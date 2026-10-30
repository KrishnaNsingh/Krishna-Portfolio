const audio = document.getElementById("audioPlayer");
const loader = document.getElementById("preloader");
const backToTopBtn = document.getElementById("backtotopbutton");

// Settings toggles (sound & appearance)
function settingtoggle() {
  document.getElementById("setting-container").classList.toggle("settingactivate");
  document.getElementById("visualmodetogglebuttoncontainer").classList.toggle("visualmodeshow");
  document.getElementById("soundtogglebuttoncontainer").classList.toggle("soundmodeshow");
}

function playpause() {
  const soundSwitch = document.getElementById("switchforsound");
  if (!audio) return;
  if (soundSwitch && soundSwitch.checked) {
    audio.play().catch(() => {
      // Audio playback blocked by browser policy
    });
  } else {
    audio.pause();
  }
}

function visualmode() {
  document.body.classList.toggle("light-mode");
  document.querySelectorAll(".needtobeinvert").forEach((el) => {
    el.classList.toggle("invertapplied");
  });
}

// Preloader completion
window.addEventListener("load", () => {
  if (loader) loader.style.display = "none";
  const hey = document.querySelector(".hey");
  if (hey) hey.classList.add("popup");
});

// Mobile menu toggling
function hamburgerMenu() {
  document.body.classList.toggle("stopscrolling");
  document.getElementById("mobiletogglemenu").classList.toggle("show-toggle-menu");
  document.getElementById("burger-bar1").classList.toggle("hamburger-animation1");
  document.getElementById("burger-bar2").classList.toggle("hamburger-animation2");
  document.getElementById("burger-bar3").classList.toggle("hamburger-animation3");
}

function hidemenubyli() {
  document.body.classList.remove("stopscrolling");
  document.getElementById("mobiletogglemenu").classList.remove("show-toggle-menu");
  document.getElementById("burger-bar1").classList.remove("hamburger-animation1");
  document.getElementById("burger-bar2").classList.remove("hamburger-animation2");
  document.getElementById("burger-bar3").classList.remove("hamburger-animation3");
}

// Navigation scroll tracking & Back-to-Top Button
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li");
const mobilenavLi = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");

function updateScrollState() {
  const currentScrollY = window.scrollY || window.pageYOffset;
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (currentScrollY >= sectionTop - 220) {
      currentSectionId = section.getAttribute("id");
    }
  });

  mobilenavLi.forEach((li) => {
    li.classList.remove("activeThismobiletab");
    if (currentSectionId && li.classList.contains(currentSectionId)) {
      li.classList.add("activeThismobiletab");
    }
  });

  navLi.forEach((li) => {
    li.classList.remove("activeThistab");
    if (currentSectionId && li.classList.contains(currentSectionId)) {
      li.classList.add("activeThistab");
    }
  });

  // Back to top button visibility
  if (backToTopBtn) {
    if (currentScrollY > 400) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  }
}

window.addEventListener("scroll", updateScrollState, { passive: true });

function scrolltoTopfunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

console.log(
  "%c Designed and Developed by Krishna Narayan Singh ",
  "background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white; font-weight:900; font-size:1rem; padding:12px; border-radius:6px;"
);
