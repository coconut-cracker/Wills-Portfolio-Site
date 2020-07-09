let links = Array.from(document.querySelectorAll(".nav-text"));
let clickBoxes = Array.from(document.querySelectorAll(".click-box"));
let navLinks = [];

console.log(history.state);

console.log(links);

const sourceCodeLink = document.querySelector(".concealed-2");

// ---------- Get each menu item information from elements and use it to style click boxes and transport to relevant page/section  ----------
for (let i = 0; i < links.length; i++) {
  Object.assign(navLinks);
  // console.log(links[i].baseURI);

  //extract style info
  let dim = links[i].getBoundingClientRect();
  // console.log(dim);

  for (let [key, value] of Object.entries(dim)) {
    // console.log(`${key}: ${value}`);
  }

  clickBoxes[i].style.height = `${dim.height}px`;
  clickBoxes[i].style.width = `${dim.width}px`;
  clickBoxes[i].style.transform = `translateY(-${dim.height}px)`;
  // clickBoxes[i].style.zIndex = 6;
  // console.log(clickBoxes[i].style);
}

// console.log(navLinks);

function mouseOver(i) {
  return function () {
    // console.log(navLinks[i].URI);
    //
    // window.location.href = navLinks[i].URI;
  };
}

// ------------------------------------------------------------------------------------------------------
