const toggleNav = () => {
  console.log("toggleNav");
  document.body.dataset.nav =
    document.body.dataset.nav === "true" ? "false" : "true";
  console.log(document.body.dataset.nav);
};
const button = document.querySelector("#nav-toggle");
button.addEventListener("click", toggleNav);

let Switch = true;
window.addEventListener("wheel", (event) => {
  if (event.deltaY > 0) {
    if (Switch === false) {
      return;
    }
    console.log("User tried to scroll down");
    toggleNav();
    Switch = false;
  } else {
    if (Switch === true) {
      return;
    }
    console.log("User tried to scroll up");
    toggleNav();
    Switch = true;
  }
});
