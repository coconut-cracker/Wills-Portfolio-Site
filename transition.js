const page = document.querySelector("#home");
let btn1 = document.querySelector("nav#nav-1");
let btn2 = document.querySelector("nav#nav-2");
let btn3 = document.querySelector("nav#nav-3");
let btn4 = document.querySelector("nav#nav-4");

console.log(btn2.classList.contains("act-1"));

// Action 1 --- +a curtain
// Action 2 --- +a+b ""
// Action 3 --- +a+b+c ""
// Action 4 --- -a ""
// Action 5 --- +b ""
// Action 6 --- +b+c ""
// Action 7 --- -a-b ""
// Action 8 --- -b ""
// Action 9 --- +c ""
// Action 10 --- -a-b-c ""
// Action 11--- -b-c ""
// Action 12 --- -c ""

document.addEventListener("DOMContentLoaded", () => {
  console.log("Home loaded");

  // Action 1: +a curtain
  if ((page.className = "home")) {
    btn2.addEventListener("click", () => {
      if (btn2.classList.contains("act-1")) {
        console.log("Page 1 to Page 2");

        page.className = "what";
        btn1.className = "nav act-4";
        btn2.className = "nav";
        btn3.className = "nav act-5";
        btn4.className = "nav act-6";

        document.querySelector(".first-svg").style.display = "block";

        let morphing = anime
          .timeline({})
          .add({
            targets: ".concealed-1, .concealed-2",
            opacity: 0,
          })
          .add(
            {
              targets: "#screen",
              opacity: [1, 0],
              duration: 1000,
              easing: "easeInQuad",
            },
            "-=1000"
          )
          .add(
            {
              targets: ".nav",
              zIndex: 10,
              opacity: [1, 0],
              complete: () => {
                document.querySelector("#screen").style.display = "none";
              },

              duration: 1500,
            },
            "-=1000"
          )
          .add(
            {
              targets: "#first",
              d: [
                {
                  value:
                    "M-233.536,0,2045.179-3.714s-284.143,391.857-614.714,390-410.429-221-742.857-209.857S243.75,460.572-9.75,455-233.536,0-233.536,0Z",
                },
                {
                  value:
                    "M-233.536,0,2045.179-3.714s-187.571,2331.643-518.143,2329.786-516.286-1226.643-848.714-1215.5S311.536,2454.215,58.036,2448.644-233.536,0-233.536,0Z",
                },
              ],
              translateY: [-600, 0],
              easing: "easeInOutSine",
              opacity: 1,
              duration: 3000,
            },
            "-=2500"
          )
          .add(
            {
              targets: ".first-svg",
              opacity: 1,
            },
            "-=3000"
          )
          .add({
            targets: ".nav",
            opacity: [0, 1],
            duration: 1500,
          });
      }
    });
  }

  // ACTION 4: -a curtain

  if ((page.className = "what")) {
    btn1.addEventListener("click", () => {
      if (btn1.classList.contains("act-4")) {
        console.log("Page 2 to Page 1");
        page.className = "home";
        btn1.className = "nav";
        btn2.className = "nav act-1";
        btn3.className = "nav act-2";
        btn4.className = "nav act-3";

        document.querySelector("#screen").style.display = "block";
        let morph0 = anime
          .timeline({})
          .add({
            targets: ".nav",
            // zIndex: 10,
            opacity: [1, 0],
            easing: "easeOutQuad",
            duration: 1000,
          })
          .add(
            {
              targets: "#screen",
              opacity: [0, 1],
              duration: 1500,
              easing: "easeInQuad",
            },
            "-=1000"
          )
          .add(
            {
              // ------ Reverse 1st SVG transition
              targets: "#first",
              d: [
                {
                  value:
                    "M-233.536,0,2045.179-3.714s-187.571,2331.643-518.143,2329.786-516.286-1226.643-848.714-1215.5S311.536,2454.215,58.036,2448.644-233.536,0-233.536,0Z",
                },
                {
                  value:
                    "M-233.536,0,2045.179-3.714s-284.143,391.857-614.714,390-410.429-221-742.857-209.857S243.75,460.572-9.75,455-233.536,0-233.536,0Z",
                },
              ],
              translateY: [0, -600],
              easing: "easeInOutQuad",

              opacity: 1,
              duration: 1800,
              complete: (anim) => {
                document.querySelector(".first-svg").style.display = "none";
              },
            },
            "-=1000"
          )
          .add({
            targets: ".nav",
            opacity: [0, 1],
            duration: 1500,
          })
          .add({});
      }
    });
  }

  // ACTION 5: +b curtain
  if ((page.className = "what")) {
    btn3.addEventListener("click", () => {
      if (btn3.classList.contains("act-1")) {
        console.log("Page 2 to Page 3");

        page.className = "how";
        btn1.className = "nav act-7";
        btn2.className = "nav act-8";
        btn3.className = "nav";
        btn4.className = "nav act-9";

        document.querySelector(".first-svg").style.display = "block";
        document.querySelector(".second-svg").style.display = "block";

        let morphing = anime
          .timeline({})
          .add({
            targets: ".concealed-1, .concealed-2",
            opacity: 0,
          })
          .add(
            {
              targets: "#screen",
              opacity: [1, 0],
              duration: 1000,
              easing: "easeInQuad",
            },
            "-=1000"
          )
          .add(
            {
              targets: ".nav",
              zIndex: 10,
              opacity: [1, 0],
              complete: () => {
                document.querySelector("#screen").style.display = "none";
              },

              duration: 1500,
            },
            "-=1000"
          )
          .add(
            {
              targets: "#first",
              d: [
                {
                  value:
                    "M-233.536,0,2045.179-3.714s-284.143,391.857-614.714,390-410.429-221-742.857-209.857S243.75,460.572-9.75,455-233.536,0-233.536,0Z",
                },
                {
                  value:
                    "M-233.536,0,2045.179-3.714s-187.571,2331.643-518.143,2329.786-516.286-1226.643-848.714-1215.5S311.536,2454.215,58.036,2448.644-233.536,0-233.536,0Z",
                },
              ],
              translateY: [-600, 0],
              easing: "easeInOutSine",
              opacity: 1,
              duration: 3000,
            },
            "-=2500"
          )
          .add(
            {
              targets: ".first-svg",
              opacity: 1,
            },
            "-=3000"
          )
          .add({
            targets: ".nav",
            opacity: [0, 1],
            duration: 1500,
          });
      }
    });
  }

  // --- End of DOMLoaded ---
});
