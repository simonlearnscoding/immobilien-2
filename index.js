const track = document.getElementById("nav-links");

// track.dataset.prevPercentage = "0";
const toggleNav = () => {
  console.log("toggleNav");
  document.body.dataset.nav =
    document.body.dataset.nav === "true" ? "false" : "true";
  console.log(document.body.dataset.nav);
  scrollToBottom();
};
const button = document.querySelector("#nav-toggle");
button.addEventListener("click", toggleNav);
//

let Switch = true;
window.addEventListener("wheel", (event) => {
  if (event.deltaX !== 0) return;
  if (event.deltaY > 0) {
    if (Switch === false) {
      return;
    }
    scrollToTop();
    console.log("User tried to scroll up");
    toggleNav();
    Switch = false;
  } else {
    if (Switch === true) {
      return;
    }
    console.log("User tried to scroll down");
    toggleNav();
    Switch = true;
  }
});

function scrollToTop() {
  setTimeout(function() {
    window.scrollTo({
      top: 0, // Set the vertical scroll position to 0 (top of the page)
      behavior: "smooth",
    });
  }, 180); // 180ms delay
}

function scrollToBottom() {
  setTimeout(function() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, 180); // 500ms delay
}

// const track = document.getElementById("nav-links");
// window.onmousedown = (e) => {
//   console.log("mousedown");
//   track.dataset.mouseDownAt = e.clientX;
// };
//
//
// // TRACK MOUSE MOVEMENT
// window.onmousemove = (e) => {
//   console.log("mosemove");
//   if (track.dataset.mouseDownAt === "0") return;
//   const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
//   const maxDelta = window.innerWidth / 2;
//   const percentage = (mouseDelta / maxDelta) * 100;
//
//   track.style.transform = `translateX(${percentage}%, -50%)`;
// };
//
// window.onmouseup = (e) => {
//   track.dataset.mouseDownAt = "0";
// };

const handleOnDown = (e) => {
  track.dataset.mouseDownAt = e.clientX;
  console.log("handleOnDown");
};

const handleOnUp = () => {
  console.log("handleOnUp");
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const imagesCount = track.getElementsByClassName("nav-link-image").length;
  const percentage = (mouseDelta / maxDelta) * 100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(
      Math.min(nextPercentageUnconstrained, 0),
      -(imagesCount - 1) * 100
    );
  console.log(
    "handleOnMove: mouseDelta:",
    mouseDelta,
    "nextPercentage:",
    nextPercentage
  ); // Add this line
  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translateY(${nextPercentage})`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("nav-link-image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

/* -- Had to add extra lines for touch events -- */

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.changedTouches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.changedTouches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);
