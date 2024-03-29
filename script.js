// SETTING VARABLE
let root = document.querySelector(":root");
let screen_w = screen.width;
let screen_h = screen.height;
let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;

// FUNCTION TO CREATE STARS
function multiple_star(n) {
  let vertical_spread = 0;
  let horizontal_spread = 0;

  if (viewportWidth <= 1800) {
    horizontal_spread = 2000;
  } else {
    horizontal_spread = 3000;
  }

  if (viewportHeight <= 1000) {
    vertical_spread = 2000;
  } else {
    vertical_spread = 3000;
  }

  let box_shadow = `${Math.floor(
    Math.random() * vertical_spread
  )}px ${Math.floor(
    Math.random() * horizontal_spread
  )}px rgb(var(--stars-color))`;

  for (let i = 2; i < n; i++) {
    box_shadow = `${box_shadow}, ${Math.floor(
      Math.random() * vertical_spread
    )}px ${Math.floor(
      Math.random() * horizontal_spread
    )}px rgb(var(--stars-color))`;
  }
  return box_shadow;
}

// PARALLAX FUCNTION
function parallax(event) {
  this.querySelectorAll("body .star").forEach((shift) => {
    const position = shift.getAttribute("value");
    const x = (window.innerWidth - event.pageX * position) / 90;
    const y = (window.innerHeight - event.pageY * position) / 90;
    shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
}

deviceMovement = function () {
  let dataRangeImages = Array.prototype.slice.call(
    document.querySelectorAll("body .star")
  );

  function handleOrientation(event) {
    dataRangeImages.forEach(function (el) {
      let maxX = window.innerWidth - el.clientWidth;
      let maxY = window.innerHeight - el.clientHeight;
      let x = event.beta;
      let y = event.gamma;

      if (x > 90) {
        x = 90;
      } else if (x < -90) {
        x = -90;
      }
      x += 90;
      y += 90;
      easeX = (maxX * x) / maxX - 120;
      easeY = (maxY * y) / maxY - 120;

      el.style.webkitTransform = "translate(" + easeY + "px," + easeX + "px)";
      el.style.transform = "translate(" + easeY + "px," + easeX + "px)";
    });
  }

  window.addEventListener("deviceorientation", handleOrientation);
}; // parallax on smartphone orientation

// LANGUAGE FUNCTIONS
function updateContent(langData) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = langData[key];
  });
} // update content

function setLanguagePreference(lang) {
  localStorage.setItem("language", lang);
} // set user's preferred language

async function fetchLanguageData(lang) {
  const response = await fetch(`languages/${lang}.json`);
  return response.json();
} // fetch language data

async function changeLanguage(lang) {
  await setLanguagePreference(lang);

  const langData = await fetchLanguageData(lang);
  updateContent(langData);
} // change language

// THEME FUNCTIONS
function setThemePreference(theme) {
  localStorage.setItem("theme", theme);
}

async function changeMode(theme) {
  await setThemePreference(theme);

  switch (theme) {
    case "light":
      root.style.setProperty(
        "--night-gradient",
        "radial-gradient(ellipse at bottom, #ececec 0%, #c4c4c4 100%)"
      );
      root.style.setProperty("--stars-color", "0, 0, 0");
      document.getElementById("dark_box").innerHTML = "□";
      document.getElementById("light_box").innerHTML = "■";
      break;

    case "dark":
      root.style.setProperty(
        "--night-gradient",
        "radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)"
      );
      root.style.setProperty("--stars-color", "255, 255, 255");
      document.getElementById("dark_box").innerHTML = "■";
      document.getElementById("light_box").innerHTML = "□";
      break;

    default:
      root.style.setProperty(
        "--night-gradient",
        "radial-gradient(ellipse at bottom, #ececec 0%, #c4c4c4 100%)"
      );
      root.style.setProperty("--stars-color", "0, 0, 0");
      document.getElementById("dark_box").innerHTML = "□";
      document.getElementById("light_box").innerHTML = "■";
  }
}

// NAV FUNCTIONS
function back_to() {
  document.getElementById("header").classList.remove("on-top");
  document.getElementById("li_about").classList.remove("is-selected");
  document.getElementById("li_projects").classList.remove("is-selected");
  document.getElementById("li_contact").classList.remove("is-selected");
  document.getElementById("about_me").classList.remove("is-selected");
  document.getElementById("projects").classList.remove("is-selected");
  document.getElementById("contact").classList.remove("is-selected");
  document.querySelectorAll("body .star").forEach((stars) => {
    stars.style.top = `0px`;
  });
  document.querySelectorAll(".meter").forEach((bar) => {
    bar.classList.remove("active");
  });
}

function about() {
  document.getElementById("li_about").classList.add("is-selected");
  document.getElementById("li_projects").classList.remove("is-selected");
  document.getElementById("li_contact").classList.remove("is-selected");
  document.getElementById("about_me").classList.add("is-selected");
  document.getElementById("projects").classList.remove("is-selected");
  document.getElementById("contact").classList.remove("is-selected");
  document.getElementById("header").classList.add("on-top");
  document.querySelectorAll("body .star").forEach((stars) => {
    stars.style.top = `-1000px`;
  });
  document.querySelectorAll(".meter").forEach((bar) => {
    bar.classList.add("active");
  });
}

function projects() {
  document.getElementById("li_about").classList.remove("is-selected");
  document.getElementById("li_projects").classList.add("is-selected");
  document.getElementById("li_contact").classList.remove("is-selected");
  document.getElementById("about_me").classList.remove("is-selected");
  document.getElementById("projects").classList.add("is-selected");
  document.getElementById("contact").classList.remove("is-selected");
  document.getElementById("header").classList.add("on-top");
  document.querySelectorAll("body .star").forEach((stars) => {
    stars.style.top = `-1000px`;
  });
  document.querySelectorAll(".meter").forEach((bar) => {
    bar.classList.remove("active");
  });
}

function contact() {
  document.getElementById("li_about").classList.remove("is-selected");
  document.getElementById("li_projects").classList.remove("is-selected");
  document.getElementById("li_contact").classList.add("is-selected");
  document.getElementById("about_me").classList.remove("is-selected");
  document.getElementById("projects").classList.remove("is-selected");
  document.getElementById("contact").classList.add("is-selected");
  document.getElementById("header").classList.add("on-top");
  document.querySelectorAll("body .star").forEach((stars) => {
    stars.style.top = `-1000px`;
  });
  document.querySelectorAll(".meter").forEach((bar) => {
    bar.classList.remove("active");
  });
}

// SLIDER FUNCTIONS
const cards = document.getElementsByClassName("card");
const last_card = cards.length - 1;
let slider_position = 0;

function nextCard() {
  cards[slider_position].classList.remove("active_card");
  cards[slider_position].classList.add("hidden_left");

  switch (slider_position) {
    case 0:
      cards[last_card].classList.remove("hidden_left");
      cards[last_card].classList.add("hidden_right");
      cards[slider_position].nextElementSibling.classList.remove(
        "hidden_right"
      );
      cards[slider_position].nextElementSibling.classList.add("active_card");
      break;
    case last_card:
      cards[0].classList.remove("hidden_right");
      cards[0].classList.add("active_card");
      cards[slider_position].previousElementSibling.classList.remove(
        "hidden_left"
      );
      cards[slider_position].previousElementSibling.classList.add(
        "hidden_right"
      );
      break;
    default:
      cards[slider_position].nextElementSibling.classList.remove(
        "hidden_right"
      );
      cards[slider_position].nextElementSibling.classList.add("active_card");
      cards[slider_position].previousElementSibling.classList.remove(
        "hidden_left"
      );
      cards[slider_position].previousElementSibling.classList.add(
        "hidden_right"
      );
  }

  if (slider_position === last_card) {
    slider_position = 0;
  } else {
    slider_position++;
  }
}

function previousCard() {
  cards[slider_position].classList.remove("active_card");
  cards[slider_position].classList.add("hidden_right");

  switch (slider_position) {
    case 0:
      cards[last_card].classList.remove("hidden_left");
      cards[last_card].classList.add("active_card");
      cards[slider_position].nextElementSibling.classList.remove(
        "hidden_right"
      );
      cards[slider_position].nextElementSibling.classList.add("hidden_left");
      break;
    case last_card:
      cards[0].classList.remove("hidden_right");
      cards[0].classList.add("hidden_left");
      cards[slider_position].previousElementSibling.classList.remove(
        "hidden_left"
      );
      cards[slider_position].previousElementSibling.classList.add(
        "active_card"
      );
      break;
    default:
      cards[slider_position].nextElementSibling.classList.remove(
        "hidden_right"
      );
      cards[slider_position].nextElementSibling.classList.add("hidden_left");
      cards[slider_position].previousElementSibling.classList.remove(
        "hidden_left"
      );
      cards[slider_position].previousElementSibling.classList.add(
        "active_card"
      );
  }

  if (slider_position === 0) {
    slider_position = last_card;
  } else {
    slider_position--;
  }
}

// CALLING FUNCTIONS AND  CHANGING CSS
const creation_stars_small = multiple_star(700);
const creation_stars_medium = multiple_star(200);
const creation_stars_big = multiple_star(100);
root.style.setProperty("--shadows-small", creation_stars_small);
root.style.setProperty("--shadows-medium", creation_stars_medium);
root.style.setProperty("--shadows-big", creation_stars_big);

if (viewportWidth >= "1025") {
  document.addEventListener("mousemove", parallax);
} else if (viewportWidth <= "1024") {
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          deviceMovement();
        }
      })
      .catch(console.error);
  } else {
    deviceMovement();
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  const userPreferredLanguage = localStorage.getItem("language") || "en";
  const langData = await fetchLanguageData(userPreferredLanguage);
  const userPreferredTheme = localStorage.getItem("theme");
  changeMode(userPreferredTheme);
  updateContent(langData);
}); // call updateContent() on page load

// load animation
window.addEventListener("load", function () {
  window.setTimeout(function () {
    document.getElementById("body").classList.remove("is-preloaded");
  }, 100);
});
