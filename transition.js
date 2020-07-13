function Animations() {
  this.page = document.querySelector("#home");
  this.btn1 = document.querySelector("nav#nav-1");
  this.btn2 = document.querySelector("nav#nav-2");
  this.btn3 = document.querySelector("nav#nav-3");
  this.btn4 = document.querySelector("nav#nav-4");

  Animations.prototype.showCards = (z) => {
    anime
      .timeline({ loop: false })
      .add({
        targets: ".first-card, .second-card",
        zIndex: z,
      })
      .add({
        targets: ".first-card",
        translateX: [1000, 0],
        duration: 1400,
      })
      .add(
        {
          targets: ".second-card",
          translateX: [1000, 0],
          duration: 1400,
        },
        "-=1000"
      );
  };

  Animations.prototype.hideCards = (z) => {
    anime
      .timeline({ loop: false })
      .add({
        targets: ".first-card, .second-card",
        zIndex: z,
      })
      .add({
        targets: ".second-card",
        translateY: [0, -700],
        duration: 1100,
      })
      .add(
        {
          targets: ".first-card",
          translateY: [0, -700],
          duration: 1100,
        },
        "-=800"
      );
  };

  Animations.prototype.navFadeIn = (z) => {
    anime.set(" .nav", { opacity: "0" });
    anime
      .timeline({ loop: false })
      .add({
        targets: ".nav",
        zIndex: z,
        translateY: -80,
      })
      .add({
        targets: ".nav",
        opacity: [0, 1],
        translateY: 0,
        easing: "easeOutQuad",
        duration: 200,
      });
  };

  Animations.prototype.navFadeOut = (z0, delay, z1) => {
    anime
      .timeline({ loop: false })
      .add({
        targets: ".nav",
        zIndex: z0,
      })
      .add({
        targets: ".nav",
        opacity: 0,
        translateY: -40,
        easing: "easeOutQuad",
        duration: 500,
      })
      .add({
        targets: ".nav",
        translateY: 0,
        opacity: 1,
        duration: 500,
        easing: "easeInOutQuad",
        delay: delay,
      })
      .add({
        targets: ".nav",
        zIndex: z1,
      });
  };

  Animations.prototype.moveTitleUp = () => {
    anime({
      targets: "#title",
      translateY: -200,
      duration: 2000,
    });
  };

  Animations.prototype.moveTitleDown = () => {
    anime({
      targets: "#title",
      translateY: "-50%",
      duration: 2200,
    });
  };

  Animations.prototype.hideHomescreenSubtext = () => {
    anime({
      targets: ".concealed-1, .concealed-2",
      opacity: [1, 0],
    });
  };
  Animations.prototype.showHomescreenSubtext = () => {
    anime({
      targets: ".concealed-1, .concealed-2",
      opacity: [0, 1],
      duration: 1000,
    });
  };
  Animations.prototype.svgOpacity = (target) => {
    anime({
      targets: target,
      opacity: 1,
    });
  };
}

function TriggerActions() {
  TriggerActions.prototype.actionOne = () => {
    console.log("Home to What page (1 -> 2)");

    // anime.set(" #title", { translateY: "-50%", translateX: "-50%" });
    page.className = "what";
    btn1.className = "nav act-4";
    btn2.className = "nav act-0";
    btn3.className = "nav act-5";
    btn4.className = "nav act-6";

    document.querySelector(".first-svg").style.display = "block";

    let morphing = anime
      .timeline({ loop: false })
      .add({
        begin: () => {
          animObj.hideHomescreenSubtext();
        },
      })
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
          begin: () => {
            animObj.svgOpacity(first);
          },
        },
        "-=2000"
      )
      .add(
        {
          begin: () => {
            animObj.moveTitleUp();
            animObj.navFadeIn(4);
          },
        },
        "-=400"
      );
  };

  TriggerActions.prototype.actionTwo = () => {
    console.log("Page 1 to Page 3");

    page.className = "how";
    btn1.className = "nav act-7";
    btn2.className = "nav act-8";
    btn3.className = "nav act-0";
    btn4.className = "nav act-9";

    document.querySelector(".first-svg").style.display = "block";
    document.querySelector(".second-svg").style.display = "block";

    let morphing = anime
      .timeline({})
      .add({
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
        begin: () => {
          animObj.svgOpacity(first);
        },
        complete: () => {
          document.querySelector("#screen").style.display = "none";
        },
      })

      .add(
        {
          targets: "#second",
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
          translateY: [-700, 0],
          easing: "easeInQuad",
          opacity: 1,
          duration: 3000,
          begin: () => {
            animObj.svgOpacity(".second-svg");
          },
        },
        "-=3000"
      )
      // Show Cards
      .add({
        begin: () => {
          // showCards(6);
          navFadeIn(6);
          moveTitleUp();
        },
      });
  };

  TriggerActions.prototype.actionThree = () => {
    console.log("Page 1 to Page 4");

    page.className = "contact";
    btn1.className = "nav act-10";
    btn2.className = "nav act-11";
    btn3.className = "nav act-12";
    btn4.className = "nav  act-0";

    document.querySelector(".first-svg").style.display = "block";
    document.querySelector(".second-svg").style.display = "block";
    document.querySelector(".third-svg").style.display = "block";

    let morphing = anime
      .timeline({})
      .add({
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
        begin: () => {
          animObj.svgOpacity(first);
        },
      })
      .add(
        {
          targets: "#second",
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
          translateY: [-700, 0],
          easing: "easeInQuad",
          opacity: 1,
          duration: 3000,
          begin: () => {
            animObj.svgOpacity(second);
          },
        },
        "-=3000"
      )
      .add(
        {
          targets: "#third",
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
          translateY: [-700, 0],
          easing: "easeInQuad",
          opacity: 1,
          begin: () => {
            animObj.svgOpacity(third);
          },
          complete: (anim) => {
            document.querySelector(".first-svg").style.display = "none";
            document.querySelector(".second-svg").style.display = "none";
          },
          duration: 3000,
        },
        "-=2800"
      )
      .add(
        {
          targets: ".title",
          complete: () => {
            animObj.moveTitleUp();
            animObj.navFadeIn(8);
          },
        },
        "-=900"
      );
  };

  TriggerActions.prototype.actionFour = () => {
    console.log("Page 2 to Page 1");
    page.className = "home";
    btn1.className = "nav act-0";
    btn2.className = "nav act-1";
    btn3.className = "nav act-2";
    btn4.className = "nav act-3";

    document.querySelector("#screen").style.display = "block";
    let morph0 = anime
      .timeline({})
      .add({
        begin: () => {
          animObj.navFadeOut(4, 500, 2);
        },
      })
      .add({
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
          animObj.moveTitleDown();
          animObj.showHomescreenSubtext();
        },
      });
  };

  TriggerActions.prototype.actionFive = () => {
    console.log("Page 2 to Page 3");

    page.className = "how";
    btn1.className = "nav act-7";
    btn2.className = "nav act-8";
    btn3.className = "nav act-0";
    btn4.className = "nav act-9";

    document.querySelector(".first-svg").style.display = "block";
    document.querySelector(".second-svg").style.display = "block";

    let morphing = anime
      .timeline({ loop: false })
      .add({
        targets: "#second",
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
        translateY: [-700, 0],
        easing: "easeInQuad",
        opacity: 1,
        duration: 3000,
        begin: () => {
          animObj.svgOpacity(second);
        },
      })
      .add(
        {
          begin: () => {
            animObj.navFadeIn(6);
          },
        },
        "-=800"
      );
  };

  TriggerActions.prototype.actionSix = () => {
    console.log("Page 2 to Page 4");

    page.className = "contact";
    btn1.className = "nav act-10";
    btn2.className = "nav act-11";
    btn3.className = "nav act-12";
    btn4.className = "nav act-0";

    document.querySelector(".first-svg").style.display = "block";
    document.querySelector(".second-svg").style.display = "block";
    document.querySelector(".third-svg").style.display = "block";

    let morphing = anime
      .timeline({})

      .add(
        {
          targets: "#second",
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
          translateY: [-700, 0],
          easing: "easeInQuad",
          opacity: 1,
          duration: 3000,
          begin: () => {
            animObj.svgOpacity(second);
          },
        },
        "-=000"
      )
      .add(
        {
          targets: "#third",
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
          translateY: [-700, 0],
          easing: "easeInQuad",
          opacity: 1,
          duration: 3000,
          begin: () => {
            animObj.svgOpacity(third);
          },
        },
        "-=2800"
      )
      .add(
        {
          begin: () => {
            animObj.navFadeIn(8);
          },
        },
        "-=800"
      );
  };

  TriggerActions.prototype.actionSeven = () => {};

  TriggerActions.prototype.actionEight = () => {};

  TriggerActions.prototype.actionNine = () => {};

  TriggerActions.prototype.actionTen = () => {};

  TriggerActions.prototype.actionEleven = () => {};

  TriggerActions.prototype.actionTwelve = () => {};
}

const animObj = new Animations();
const actionsObj = new TriggerActions();

const page = document.querySelector("#home");
let btn1 = document.querySelector("nav#nav-1");
let btn2 = document.querySelector("nav#nav-2");
let btn3 = document.querySelector("nav#nav-3");
let btn4 = document.querySelector("nav#nav-4");
let navs = document.querySelectorAll(".nav");
console.log(navs);

function showCards(z) {
  anime
    .timeline({ loop: false })
    .add({
      targets: ".first-card, .second-card",
      zIndex: z,
    })
    .add({
      targets: ".first-card",
      translateX: [1000, 0],
      duration: 1400,
      // easing: "easeInOutBack",
    })
    .add(
      {
        targets: ".second-card",
        translateX: [1000, 0],
        duration: 1400,
        // easing: "easeInOutBack",
      },
      "-=1000"
    );
}

function hideCards(z) {
  anime
    .timeline({ loop: false })
    .add({
      targets: ".first-card, .second-card",
      zIndex: z,
    })
    .add({
      targets: ".second-card",
      translateY: [0, -700],
      duration: 1100,
    })
    .add(
      {
        targets: ".first-card",
        translateY: [0, -700],
        duration: 1100,
        // easing: "easeInOutBack",
      },
      "-=800"
    );
}

function navFadeOut(z0, delay, z1) {
  // anime.set(" .nav", { zIndex: z });

  anime
    .timeline({ loop: false })
    .add({
      targets: ".nav",
      zIndex: z0,
    })
    .add({
      targets: ".nav",
      opacity: 0,
      translateY: -40,
      easing: "easeOutQuad",
      duration: 500,
    })
    .add({
      targets: ".nav",
      translateY: 0,
      opacity: 1,
      duration: 500,
      easing: "easeInOutQuad",

      // complete: () => {
      //   anime.set(".nav", { translateY: "0" });
      // },
      delay: delay,
    })
    .add({
      targets: ".nav",
      zIndex: z1,
    });
}

function navFadeIn(z) {
  anime.set(" .nav", { opacity: "0" });

  anime
    .timeline({ loop: false })
    .add({
      targets: ".nav",
      zIndex: z,
      translateY: -80,
    })
    .add({
      targets: ".nav",
      opacity: [0, 1],
      translateY: 0,

      easing: "easeOutQuad",
      duration: 200,
    });
}

function moveTitleUp() {
  anime({
    targets: "#title",
    translateY: -200,
    duration: 2000,
  });
}
function moveTitleDown() {
  anime({
    targets: "#title",
    translateY: "-50%",
    duration: 2200,
  });
}

console.log(btn3);

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

// NAV Z-INDECES:
// Home: 2
// Who: 4
// How: 6
// Contact: 8

const first = ".first-svg";
const second = ".second-svg";
const third = ".third-svg";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Home loaded");

  // PAGE: HOME

  if ((page.className = "home")) {
    anime.set(" #title", { translateY: "-50%", translateX: "-50%" });

    // ACTION 1: +a curtain
    navs.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const whichNav = e.target.parentElement.classList[1];
        console.log(whichNav);

        switch (whichNav) {
          case "act-1":
            console.log("Action 1 Triggured");
            actionsObj.actionOne();
            break;
          case "act-2":
            console.log("Action 2 Triggured");
            actionsObj.actionTwo();
            break;
          case "act-3":
            console.log("Action 3 Triggured");
            actionsObj.actionThree();
            break;
          case "act-4":
            console.log("Action 4 Triggured");
            actionsObj.actionFour();
            break;
          case "act-5":
            console.log("Action 5 Triggured");
            actionsObj.actionFive();
            break;
          case "act-6":
            console.log("Action 6 Triggured");
            actionsObj.actionSix();
            break;
          case "act-7":
            console.log("Action 7 Triggured");
            actionsObj.actionSeven();
            break;
          case "act-8":
            console.log("Action 8 Triggured");
            actionsObj.actionEight();
            break;
          case "act-9":
            console.log("Action 9 Triggured");
            actionsObj.actionNine();
            break;
          case "act-10":
            console.log("Action 10 Triggured");
            actionsObj.actionTen();
            break;
          case "act-11":
            console.log("Action 11 Triggured");
            actionsObj.actionEleven();
            break;
          case "act-12":
            console.log("Action 12 Triggured");
            actionsObj.actionTwelve();
            break;

          default:
            return;
        }
      });

      // if (btn2.classList.contains("act-1")) {
      //   console.log("Page 1 to Page 2");
      //   actionsObj.actionOne();
      // }
    });
    // END OF ACTION 1

    // ACTION 2: +a+b curtain
    // btn3.addEventListener("click", () => {
    //   if (btn3.classList.contains("act-2")) {
    //   }
    // }); // END OF ACTION 2

    // ACTION 3: +a+b+c curtain
    // btn4.addEventListener("click", () => {
    //   if (btn4.classList.contains("act-3")) {
    //   }
    // }); // END OF ACTION 3
  }

  // PAGE: WHAT
  // ACTION 4: -a curtain

  if ((page.className = "what")) {
    // btn1.addEventListener("click", () => {
    //   if (btn1.classList.contains("act-4")) {
    //   }
    // }); // END OF ACTION 4

    // ACTION 5: +b curtain
    // btn3.addEventListener("click", () => {
    //   if (btn3.classList.contains("act-5")) {

    //   }
    // }); // END OF ACTION 5

    // ACTION 6: +b+c curtains
    btn4.addEventListener("click", () => {
      if (btn4.classList.contains("act-6")) {
        // .add({
        //   targets: ".nav",
        //   opacity: [0, 1],
        //   duration: 1500,
        // });
      }
    }); // END OF ACTION 6
  } // END OF PAGE WHAT

  // ------------------------- PAGE: HOW ---------------------------

  // ACTION 7: -a-b curtains
  if ((page.className = "how")) {
    btn1.addEventListener("click", () => {
      if (btn1.classList.contains("act-7")) {
        console.log("Page 3 to Page 1");
        page.className = "home";
        btn1.className = "nav act-0";
        btn2.className = "nav act-1";
        btn3.className = "nav act-2";
        btn4.className = "nav act-3";

        document.querySelector("#screen").style.display = "block";
        document.querySelector(".second-svg").style.display = "block";
        document.querySelector(".first-svg").style.display = "block";

        let morph0 = anime
          .timeline({})
          .add({
            begin: () => {
              navFadeOut(6, 1300, 2);
            },
          })

          // ------------- Reverse 2ns SVG (b)
          .add(
            {
              targets: "#second",
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
            },
            "-=00"
          )
          .add(
            {
              // ------ Reverse 1st SVG transition (a)
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
              complete: (anim) => {
                document.querySelector(".first-svg").style.display = "none";
                document.querySelector(".second-svg").style.display = "none";
                // navFadeIn(2);
                moveTitleDown();
              },
              opacity: 1,
              duration: 2000,
            },
            "-=1600"
          );
      }
    }); // END OF ACTION 7

    // ACTION 8: -b curtain
    btn2.addEventListener("click", () => {
      if (btn2.classList.contains("act-8")) {
        console.log("Page 3 to Page 2");

        page.className = "what";
        btn1.className = "nav act-4";
        btn2.className = "nav act-0";
        btn3.className = "nav act-5";
        btn4.className = "nav act-6";

        document.querySelector(".second-svg").style.display = "block";

        let morph0 = anime
          .timeline({})
          .add({
            begin: () => {
              navFadeOut(6, 500, 4);
            },
          })

          // ------------- Reverse 2ns SVG (b)
          .add(
            {
              targets: "#second",
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
              complete: (anim) => {
                document.querySelector(".second-svg").style.display = "none";
              },
              duration: 1800,
            },
            "-=00"
          );
        // // Show Cards
        // .add({
        //   begin: () => {
        //     showCards();
        //   },
        // })
      }
    }); // END OF ACTION 8

    // ACTION 9: +c curtain
    btn4.addEventListener("click", () => {
      if (btn4.classList.contains("act-9")) {
        console.log("Page 3 to Page 4");

        page.className = "contact";
        btn1.className = "nav act-10";
        btn2.className = "nav act-11";
        btn3.className = "nav act-12";
        btn4.className = "nav act-0";

        document.querySelector(".first-svg").style.display = "block";
        document.querySelector(".second-svg").style.display = "block";
        document.querySelector(".third-svg").style.display = "block";

        let morphing = anime
          .timeline({})
          .add(
            {
              targets: "#third",
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
              translateY: [-700, 0],
              easing: "easeInQuad",
              opacity: 1,
              complete: (anim) => {
                document.querySelector(".first-svg").style.display = "none";
                document.querySelector(".second-svg").style.display = "none";
              },
              duration: 3000,
            },
            "-=00"
          )
          .add(
            {
              targets: ".third-svg",
              opacity: 1,
            },
            "-=2800"
          )
          .add(
            {
              begin: () => {
                // showCards(6);
                navFadeIn(8);
              },
            },
            "-=800"
          );
      }
    }); // END OF ACTION 9
  }

  // -------------------- PAGE: CONTACT ---------------------

  // ACTION 10: -a-b-c curtains
  if ((page.className = "contact")) {
    btn1.addEventListener("click", () => {
      if (btn1.classList.contains("act-10")) {
        console.log("Page 4 to Page 1");
        page.className = "home";
        btn1.className = "nav  act-0";
        btn2.className = "nav act-1";
        btn3.className = "nav act-2";
        btn4.className = "nav act-3";

        document.querySelector("#screen").style.display = "block";
        document.querySelector(".first-svg").style.display = "block";
        document.querySelector(".second-svg").style.display = "block";
        document.querySelector(".third-svg").style.display = "block";

        let morph0 = anime
          .timeline({})
          .add({
            begin: () => {
              navFadeOut(8, 1300, 2);
            },
          })

          // ------------- Reverse 3rd SVG (c)
          .add(
            {
              targets: "#third",
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
            }
            // "-=1800"
          )

          // ------------- Reverse 2nd SVG (b)
          .add(
            {
              targets: "#second",
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
            },
            "-=1600"
          )
          // ------ Reverse 1st SVG transition (a)
          .add(
            {
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
              complete: (anim) => {
                document.querySelector(".first-svg").style.display = "none";
                document.querySelector(".second-svg").style.display = "none";
                document.querySelector(".third-svg").style.display = "none";
                moveTitleDown();
              },
              opacity: 1,
              duration: 2000,
            },
            "-=1500"
          );
      }
    }); // END OF ACTION 10

    // ACTION 11: -b-c curtains
    btn2.addEventListener("click", () => {
      if (btn2.classList.contains("act-11")) {
        console.log("Page 4 to Page 2");

        page.className = "what";
        btn1.className = "nav act-4";
        btn2.className = "nav act-0";
        btn3.className = "nav act-5";
        btn4.className = "nav act-6";

        document.querySelector(".first-svg").style.display = "block";
        document.querySelector(".second-svg").style.display = "block";
        document.querySelector(".third-svg").style.display = "block";

        let morph0 = anime
          .timeline({})
          .add({
            begin: () => {
              navFadeOut(8, 900, 4);
            },
          })

          // ------------- Reverse 3rd SVG (c)
          .add({
            targets: "#third",
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
          })

          // ------------- Reverse 2nd SVG (b)
          .add(
            {
              targets: "#second",
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
              complete: (anim) => {
                document.querySelector(".second-svg").style.display = "none";
                document.querySelector(".third-svg").style.display = "none";
              },
              duration: 1800,
            },
            "-=1600"
          );
      }
    }); // END OF ACTION 11

    // ACTION 12: -c curtain
    btn3.addEventListener("click", () => {
      if (btn3.classList.contains("act-12")) {
        console.log("Page 4 to Page 3");

        page.className = "what";
        btn1.className = "nav act-7";
        btn2.className = "nav act-8";
        btn3.className = "nav act-0";
        btn4.className = "nav act-9";

        document.querySelector(".first-svg").style.display = "block";
        document.querySelector(".second-svg").style.display = "block";
        document.querySelector(".third-svg").style.display = "block";

        let morph0 = anime
          .timeline({})
          .add({
            begin: () => {
              navFadeOut(8, 600, 6);
            },
          })

          // ------------- Reverse 3rd SVG (c)
          .add({
            targets: "#third",
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
            complete: (anim) => {
              document.querySelector(".third-svg").style.display = "none";
            },
            duration: 1800,
          });
      }
    }); // END OF ACTION 12
  }

  // --- End of DOMLoaded ---
});
