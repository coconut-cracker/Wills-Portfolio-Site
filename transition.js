const cards = Array.from(document.querySelectorAll(".card"));
const cardObj = { cards, shown: false };

const tech = Array.from(document.querySelectorAll(".tech"));
const techCardObj = { tech, shown: false };

// const tech =
console.log(techCardObj);

function Animations() {
  Animations.prototype.showCards = (item, z) => {
    switch (item) {
      case "projectCards":
        if (!cardObj.shown) {
          console.log(cardObj.shown);
          console.log("shown = false");

          anime
            .timeline({ loop: false })
            .add({
              targets: ".first-card, .second-card",
              zIndex: z,
              translateY: 0,
              complete: () => {
                cards.forEach((e) => {
                  e.style.display = "block";
                });
              },
            })
            .add({
              targets: ".first-card",

              translateX: [1000, 0],
              opacity: 1,
              duration: 1400,
            })
            .add(
              {
                targets: ".second-card",
                translateX: [1000, 0],
                opacity: 1,
                duration: 1400,
              },
              "-=1000"
            );

          cardObj.shown = true;
          console.log(cardObj.shown);
        } else {
          return;
        }
        break;
      case "techCards":
        if (!techCardObj.shown) {
          console.log(techCardObj.shown);
          console.log("shown = false");

          anime
            .timeline({ loop: false })
            .add({
              targets: ".tech",
              zIndex: z,
              translateX: 1000,
              translateY: 0,
              complete: () => {
                tech.forEach((e) => {
                  e.style.display = "flex";
                });
                console.log(tech);
              },
            })
            .add({
              targets: ".tech, .tech-card-1",
              translateX: [1000, 0],
              opacity: 1,
              duration: 1400,
            })
            .add(
              {
                targets: ".tech-card-2",
                translateX: [1000, 0],
                opacity: 1,
                duration: 1400,
              },
              "-=1000"
            );
          // .add(
          //   {
          //     targets: ".tech",
          //     translateX: [1000, 0],
          //     opacity: 1,
          //     duration: 1400,
          //   },
          //   "-=1000"
          // );

          techCardObj.shown = true;
          console.log(techCardObj.shown);
        } else {
          return;
        }

      default:
        return;
    }
  };

  Animations.prototype.hideCards = (item) => {
    switch (item) {
      case "projectCards":
        if (cardObj.shown) {
          console.log(cardObj.shown);
          anime.timeline({ loop: false }).add({
            targets: ".card ",
            opacity: 0,
            translateY: -40,
            easing: "easeInOutQuad",
            duration: 300,
            complete: () => {
              cards.forEach((e) => {
                e.style.display = "none";
                console.log(
                  "HideCards called: Project Card set to display none"
                );
              });
            },
          });

          cardObj.shown = false;
          console.log(cardObj.shown);
        } else {
          return;
        }
        break;
      case "techCards":
        if (techCardObj.shown) {
          console.log(techCardObj.shown);
          anime.timeline({ loop: false }).add({
            targets: ".tech ",
            opacity: 0,
            translateY: -40,
            easing: "easeInOutQuad",
            duration: 300,
            complete: () => {
              tech.forEach((e) => {
                e.style.display = "none";
                console.log("HideCards called:  Tech Card set to display none");
              });
            },
          });

          techCardObj.shown = false;
          console.log(cardObj.shown);
        } else {
          return;
        }
        break;
      default:
        return;
    }
  };

  Animations.prototype.navFadeIn = (z, delay) => {
    anime.set(" .nav", { opacity: "0" });
    anime
      .timeline({ loop: false })
      .add({
        targets: ".nav",
        zIndex: z + 1,
        translateY: -80,
      })
      .add({
        targets: ".nav ",
        opacity: [0, 1],
        translateY: 0,
        easing: "easeOutQuad",
        duration: 200,
        // delay: delay,
      });
  };

  Animations.prototype.navFadeOut = (z0, z1) => {
    anime
      .timeline({ loop: false })
      .add({
        targets: ".nav",
        zIndex: z0,
      })
      .add({
        targets: ".nav ",
        opacity: 0,
        translateY: -40,
        easing: "easeInOutQuad",
        duration: 300,
      })
      // .add({
      //   targets: ".nav",
      //   translateY: 0,
      //   opacity: 1,
      //   duration: 500,
      //   easing: "easeInOutQuad",
      //   // delay: delay,
      // })
      .add({
        targets: ".nav",
        zIndex: z1,
      });
  };

  Animations.prototype.moveTitleUp = (r) => {
    anime.set(" #title", { translateY: "-50%", translateX: "-50%" });

    anime({
      targets: "#title",
      top: ["50%", "10%"],
      scale: 0.8,
      opacity: [1, 0],
      easing: "easeOutExpo",
      duration: 900 * r,
    });
  };

  Animations.prototype.moveTitleDown = () => {
    anime({
      targets: "#title",
      top: "50%",
      scale: 1,
      opacity: [0, 1],
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

// ------------ Action groups for each page change ----------

function TriggerActions() {}

TriggerActions.prototype.actionOne = () => {
  console.log("Home to What page (1 -> 2)");

  // cards.forEach((e) => {
  //   e.style.display = "block";
  // });

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
      translateY: [-500, 0],
      easing: "easeInOutQuad",
      opacity: 1,
      duration: 2000,
      begin: () => {
        animObj.svgOpacity(first);
        // animObj.hideHomescreenSubtext();
      },
    })
    .add(
      {
        complete: () => {
          animObj.navFadeIn(4);
          animObj.showCards("projectCards", 4);
        },
      },
      "-=2100"
    )
    .add(
      {
        begin: () => {
          animObj.moveTitleUp(1);
        },
      },
      "-=500"
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
      easing: "easeInOutQuad",
      opacity: 1,
      duration: 2000,
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
        translateY: [-600, 0],
        easing: "easeInQuad",
        opacity: 1,
        duration: 2000,
        begin: () => {
          animObj.svgOpacity(".second-svg");
        },
      },
      "-=1950"
    )
    .add(
      {
        begin: () => {
          animObj.navFadeIn(6);
          animObj.showCards("techCards", 6);
        },
      },
      "-=1000"
    )
    .add(
      {
        begin: () => {
          animObj.moveTitleUp(1.2);
        },
        // complete: () => {
        //   document.querySelector("#screen").style.display = "none";
        // },
      },
      "-=200"
    );
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
    .timeline({
      begin: () => {
        animObj.svgOpacity(first);
        animObj.svgOpacity(second);
        animObj.svgOpacity(third);
      },
    })
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
      duration: 2200,
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
        translateY: [-600, 0],
        easing: "easeInQuad",
        opacity: 1,
        duration: 2000,
        begin: () => {},
      },
      "-=2000"
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
        translateY: [-600, 0],
        easing: "easeInQuad",
        opacity: 1,
        begin: () => {},
        complete: (anim) => {
          document.querySelector(".first-svg").style.display = "none";
          document.querySelector(".second-svg").style.display = "none";
        },
        duration: 2000,
      },
      "-=1800"
    )
    .add(
      {
        begin: () => {
          animObj.navFadeIn(8);
        },
      },
      "-=900"
    )
    .add(
      {
        begin: () => {
          animObj.moveTitleUp(1.1);
        },
      },
      "+=100"
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
      begin: () => {
        animObj.hideCards("projectCards");
        animObj.navFadeOut(4, 2);
      },
      complete: (anim) => {
        document.querySelector(".first-svg").style.display = "none";
        // animObj.showHomescreenSubtext();
      },
    })
    .add(
      {
        begin: () => {
          animObj.navFadeIn(2);
        },
      },
      "-=1500"
    )
    .add(
      {
        begin: () => {
          animObj.moveTitleDown();
        },
      },
      "-=200"
    );
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
          animObj.showCards("techCards", 6);
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

TriggerActions.prototype.actionSeven = () => {
  console.log("Page 3 to Page 1");
  page.className = "home";
  btn1.className = "nav act-0";
  btn2.className = "nav act-1";
  btn3.className = "nav act-2";
  btn4.className = "nav act-3";

  console.log(cards);
  cards.forEach((e) => {
    e.style.display = "none";
  });
  cardObj.shown = false;

  document.querySelector("#screen").style.display = "block";
  document.querySelector(".second-svg").style.display = "block";
  document.querySelector(".first-svg").style.display = "block";

  let morph0 = anime
    .timeline({})

    // ------------- Reverse 2ns SVG (b)
    .add({
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
      begin: () => {
        animObj.navFadeOut(6, 2);
        animObj.hideCards("techCards");
      },
    })
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
        },
        opacity: 1,
        duration: 1800,
      },
      "-=1600"
    )
    .add(
      {
        begin: () => {
          animObj.navFadeIn(6);
        },
      },
      "-=1600"
    )
    .add(
      {
        begin: () => {
          animObj.moveTitleDown();
        },
      },
      "-=400"
    );
};

TriggerActions.prototype.actionEight = () => {
  console.log("Page 3 to Page 2");

  page.className = "what";
  btn1.className = "nav act-4";
  btn2.className = "nav act-0";
  btn3.className = "nav act-5";
  btn4.className = "nav act-6";

  document.querySelector(".second-svg").style.display = "block";

  let morph0 = anime
    .timeline({})
    .add({})
    // ------------- Reverse 2nd SVG (b)
    .add({
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
      begin: () => {
        animObj.navFadeOut(6, 4);
        animObj.hideCards("techCards");
      },
      complete: (anim) => {
        document.querySelector(".second-svg").style.display = "none";
      },
      duration: 1500,
    })
    .add(
      {
        begin: () => {
          animObj.navFadeIn(4);
          animObj.showCards("projectCards", 4);
        },
      },
      "-=1200"
    );
};

TriggerActions.prototype.actionNine = () => {
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
    .add({
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
      begin: () => {
        animObj.svgOpacity(third);
      },
    })
    .add(
      {
        begin: () => {
          animObj.navFadeIn(8);
        },
      },
      "-=800"
    );
};

TriggerActions.prototype.actionTen = () => {
  console.log("Page 4 to Page 1");
  page.className = "home";
  btn1.className = "nav  act-0";
  btn2.className = "nav act-1";
  btn3.className = "nav act-2";
  btn4.className = "nav act-3";

  console.log(cards);
  cards.forEach((e) => {
    e.style.display = "none";
  });
  cardObj.shown = false;

  tech.forEach((e) => {
    e.style.display = "none";
  });
  techCardObj.shown = false;

  document.querySelector("#screen").style.display = "block";
  document.querySelector(".first-svg").style.display = "block";
  document.querySelector(".second-svg").style.display = "block";
  document.querySelector(".third-svg").style.display = "block";

  let morph0 = anime
    .timeline({
      begin: () => {
        animObj.navFadeOut(8, 2);
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
          animObj.moveTitleDown();
        },
        opacity: 1,
        duration: 2000,
      },
      "-=1500"
    )
    .add(
      {
        begin: () => {
          animObj.navFadeIn(2);
        },
      },
      "-=1500"
    )
    .add(
      {
        begin: () => {
          animObj.moveTitleDown();
        },
      },
      "-=200"
    );
};

TriggerActions.prototype.actionEleven = () => {
  console.log("Page 4 to Page 2");

  page.className = "what";
  btn1.className = "nav act-4";
  btn2.className = "nav act-0";
  btn3.className = "nav act-5";
  btn4.className = "nav act-6";

  tech.forEach((e) => {
    e.style.display = "none";
  });
  techCardObj.shown = false;

  document.querySelector(".first-svg").style.display = "block";
  document.querySelector(".second-svg").style.display = "block";
  document.querySelector(".third-svg").style.display = "block";

  let morph0 = anime
    .timeline({})
    .add({
      begin: () => {
        animObj.navFadeOut(8, 900, 4);
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
      duration: 1500,
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
        duration: 1500,
      },
      "-=1300"
    )
    .add(
      {
        begin: () => {
          animObj.navFadeIn(4);
          animObj.showCards("projectCards", 4);
        },
      },
      "-=1000"
    );
};

TriggerActions.prototype.actionTwelve = () => {
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
        animObj.navFadeOut(8, 6);
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
      duration: 1500,
    })
    .add(
      {
        begin: () => {
          animObj.navFadeIn(6);
          animObj.showCards("techCards", 6);
        },
      },
      "-=1200"
    );
};

const animObj = new Animations();
const actionsObj = new TriggerActions();

console.log(actionsObj);

const page = document.querySelector("#home");
let btn1 = document.querySelector("nav#nav-1");
let btn2 = document.querySelector("nav#nav-2");
let btn3 = document.querySelector("nav#nav-3");
let btn4 = document.querySelector("nav#nav-4");
let navs = document.querySelectorAll(".nav");
console.log(navs);
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

  // ACTION TRIGGERS

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
  });

  // --- End of DOMLoaded ---
});
