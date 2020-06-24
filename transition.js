document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded");
  let btn = document.getElementById("nav-1");
  btn.addEventListener("click", () => {
    var morphing = anime
      .timeline({})
      .add({
        targets: ".concealed-1, concealed-2",
        opacity: 0,
        easing: "easeInOutQuad",
        duration: 1000,
      })

      // .add(
      //   {
      //     targets: "#home",
      //     opacity: 0,

      //     easing: "easeInOutQuad",
      //     duration: 2000,
      //   },
      //   "-=1000"
      // )
      // .add(
      //   {
      //     targets: "#screen",
      //     opacity: [1, 0],
      //     easing: "easeInQuad",
      //     duration: 2000,
      //   },
      //   "-=1000"
      // )
      // .add({
      //   targets: ".third-svg",
      //   duration: 1500,
      //   complete: (anim) => {
      //     // document.querySelector("#screen").style.display = "none";
      //     // document.querySelector("#home").style.display = "none";
      //     // document.querySelector(".second_page").style.display = "flex";
      //   },
      // })
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
          easing: "easeInQuad",
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
          duration: 3025,
        },
        "-=2800"
      )
      .add(
        {
          targets: ".second-svg",
          opacity: 1,
        },
        "-=2800"
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
          duration: 3050,
        },
        "-=2800"
      )
      .add(
        {
          targets: ".third-svg",
          opacity: 1,
          complete: (anim) => {
            document.querySelector("#screen").style.display = "none";
            document.querySelector("#home").style.display = "none";
          },
        },
        "-=1800"
      )

      .add(
        {
          targets: ".app_img",
          translateX: [200, 0],
          opacity: [0, 1],
          duration: 1500,
        },
        "-=1000"
      )
      .add(
        {
          targets: ".text_wrapper, .download",
          translateX: [-200, 0],
          opacity: [0, 1],
          duration: 1500,
        },
        "-=1000"
      );
  });
});
