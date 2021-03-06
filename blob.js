/*
Will's Note: The interactive animations herein have been inspired by the work by Thom Chiovoloni, as seen in this codepen: codepen.io/thomcc/pen/gzbjF

Copyright (c) 2014 Thom Chiovoloni (web: thomcc.io, github: github.com/thomcc)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

const canvas = document.getElementById("screen");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const responsive = false;
let width = canvas.width;
let height = canvas.height;
let timeout;
let transformValuesArray = [0, 0];

const DEFAULT_HEIGHT = 754;
const DEFAULT_WIDTH = 1536;
const SCALE_COEFFICIENT = 0.8;
const RANDOM_OFFSET = false;
const XOFF = 0;
const YOFF = 0;
const BLOB_COLOR_1 = "#FF4500";
// const BLOB_COLOR_1 = "#7C7C7C";
const BLOB_COLOR_2 = "#FFD700";
// const BLOB_COLOR_2 = "#303030";
const MIN_NODE_COUNT = 10;

const setScale = (width, height) => {
  const SCALE_X = (width / DEFAULT_WIDTH) * SCALE_COEFFICIENT;
  const SCALE_Y = (height / DEFAULT_HEIGHT) * SCALE_COEFFICIENT;
  return { SCALE_X, SCALE_Y };
};

const { SCALE_X, SCALE_Y } = setScale(width, height);

console.log(SCALE_Y);

// -------- Setup a timer for resize events----------

function resizeListener() {
  // If timer is null, reset it to 66ms and run functions. Otherwise, wait until timer is cleared
  if (!timeout) {
    timeout = setTimeout(function () {
      timeout = null;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setScale(width, height);
      initialize(options);
    }, 66);
  }
}

// Listen for resize events
window.addEventListener("resize", resizeListener, false);

// --------- Load canvas size ---------
window.addEventListener("load", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = window.innerWidth;
  height = window.innerHeight;
  setScale(width, height);
  let svgList = Array.from(document.getElementsByTagName("path"));
  let path;

  // initialize(options);

  console.log(svgList);
  svgList.map((p) => {
    path = p;
    // console.log("iterated path:", path);
    new findPoints(options);
  });
});

// ---------- Refactoring using OOP ----------
// ---------- Set Blob Options ----------

const options = {
  COLOR_FILL: "#3b3b3b", //"#7de891",
  SCALE_X,
  SCALE_Y,
  ANCHOR_STIFFNESS: 1,
  ANCHOR_DAMP: 0.5,
  MOUSE_FORCE: 6,
  MOUSE_RADIUS: 150, // Multiplied by scale for different resolution screens
  SIMULATION_RATE: 19,
  MAX_ACROSS_NEIGHBOR_DIST: 0.5,
};

// ---------- Declare + Assign coordinate variables  ----------
// if 'transform' attribute in SVG, extract number values and assign as xy offsets to be reapplied on points coords.

function findPoints(options) {
  this.options = options;
  this.svgPoints = [];
  this.path = document.getElementById("Path_1");
  this.transProp = this.path.getAttribute("transform");
  this.transformValuesArray = this.transform(this.transProp);
  this.transX = this.transformValuesArray[0];
  this.transY = this.transformValuesArray[1];
  this.totalLength = this.path.getTotalLength();
  this.pointsArr = this.getPoints(
    this.nodes(),
    this.totalLength,
    this.path,
    this.svgPoints,
    this.transformValuesArray
  );
}

findPoints.prototype.nodes = function () {
  let nodes = MIN_NODE_COUNT + Math.floor(30 * SCALE_Y); // no. of nodes scalable with window height, with a hard min of 10
  return nodes;
};

findPoints.prototype.transform = function (tr) {
  if (tr == null) return transformValuesArray;
  let transXY = tr.match(/[-]{0,1}[\d]*[.]{0,1}[\d]+/g);
  let transformValuesArray = [transXY[0], transXY[1]];
  return transformValuesArray;
};

findPoints.prototype.getPoints = function (
  nodes,
  totalLength,
  path,
  svgp,
  transformArray
) {
  if (nodes == null || totalLength == null || path == null)
    return console.log("There's been an error (findPoints.getPoints())");

  for (let i = 0; i <= nodes - 1; i++) {
    const dist = ((i * 1) / nodes) * totalLength;
    // Create a node at end of each segment and apply XY offsets to each coord; push each to array
    const p = path.getPointAtLength(dist);
    if (responsive) {
      svgp = [...svgp, [p.x - transformArray[0], p.y - transformArray[1]]];
    } else {
      svgp = [...svgp, [p.x, p.y]];
    }
  }
  this.points(svgp);
};

findPoints.prototype.points = function (initialPoints) {
  // find average of points (x, y)
  let x = 0;
  let y = 0;
  for (let i = 0; i < initialPoints.length; i++) {
    x += initialPoints[i][0];
    y += initialPoints[i][1];
  }
  let meanBlobWidth = (x / initialPoints.length) * 2;
  let meanBlobHeight = (y / initialPoints.length) * 2;

  const maxValueOfY = Math.max(...initialPoints.map((o) => o[1]), 0);
  const minValueOfY = Math.min(...initialPoints.map((o) => o[1]), 0);
  const maxValueOfX = Math.max(...initialPoints.map((o) => o[0]), 0);
  const minValueOfX = Math.min(...initialPoints.map((o) => o[0]), 0);

  let maxBlobHeight = maxValueOfY - minValueOfY;
  let maxBlobWidth = maxValueOfX - minValueOfX;

  let ctx = canvas.getContext("2d");
  let grd = ctx.createLinearGradient(0, 0, maxBlobWidth, maxBlobHeight);
  grd.addColorStop(0, BLOB_COLOR_1);
  grd.addColorStop(1, BLOB_COLOR_2);

  options.COLOR_FILL = grd;
  console.log(options.COLOR_FILL);

  let offsetY = (height - meanBlobHeight) / 2;
  let offsetX = (width - meanBlobWidth) / 2;

  // console.log("ave width;", meanBlobWidth, "max width", maxBlobWidth);
  // console.log("ave Height;", meanBlobHeight, "max Height", maxBlobHeight);

  let pointsArr = initialPoints.map(function (xy) {
    xy[0] += Math.random() - 0.5 + offsetX;
    xy[1] += Math.random() - 0.5 + offsetY;

    return [xy[0] + XOFF, xy[1] + YOFF];
  });
  renderBlob(pointsArr, options);
};

// ------------------- INITIALISE ALL --------------------

function initialize(opts) {
  new findPoints(opts);
}

// ------------------- RENDER BLOB --------------------

function renderBlob(points, opts) {
  "use strict";

  //should be this.variables ?
  const {
    COLOR_FILL,
    SCALE_X,
    SCALE_Y,
    ANCHOR_STIFFNESS,
    ANCHOR_DAMP,
    MOUSE_FORCE,
    MOUSE_RADIUS,
    SIMULATION_RATE,
    MAX_ACROSS_NEIGHBOR_DIST,
  } = opts;

  const POINTS = points;

  function Vec2(x, y) {
    this.x = x;
    this.y = y;
  }
  Vec2.prototype.set = function (x, y) {
    this.x = x;
    this.y = y;
    return this;
  };
  Vec2.prototype.copy = function (v) {
    return this.set(v.x, v.y);
  };
  Vec2.prototype.translate = function (x, y) {
    return this.set(this.x + x, this.y + y);
  };
  Vec2.prototype.scale = function (v) {
    return this.set(this.x * v, this.y * v);
  };
  Vec2.prototype.distance = function (o) {
    let dx = this.x - o.x * 2,
      dy = this.y - o.y * 2; //*3, /1000
    return Math.sqrt(dx * dx + dy * dy);
  };

  function JellyPoint(x, y) {
    this.pos = new Vec2(x, y);
    this.last = new Vec2(x, y);
    this.anchor = new Vec2(x, y);
    this.vel = new Vec2(0, 0);
    this.neighbors = [];
  }
  JellyPoint.prototype.addAcrossNeighbor = function (n) {
    this.addNeighbor(n, 1, 2);
  };

  JellyPoint.prototype.addNeighbor = function (n, c, s) {
    this.neighbors.push({
      pos: n.pos,
      vel: n.vel,
      dist: this.pos.distance(n.pos),
      compress: c,
      strength: s,
    });
  };

  JellyPoint.prototype.setNeighbors = function (p, n) {
    this.addNeighbor(p, 30, 0.5);
  };

  JellyPoint.prototype.move = function (t, m) {
    let dx = m.pos.x - this.pos.x;
    let dy = m.pos.y - this.pos.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (!m.down) {
      if (dist < MOUSE_RADIUS) {
        this.vel.x += dx * MOUSE_FORCE;
        this.vel.y += dy * MOUSE_FORCE;
      }
    } else if (m.down) {
      if (dist < MOUSE_RADIUS) {
        this.vel.x -= dx * MOUSE_FORCE;
        this.vel.y -= dy * MOUSE_FORCE;
      }
    }
    this.vel.scale(ANCHOR_DAMP);
    let offx =
      this.anchor.x > 0
        ? (this.anchor.x - this.pos.x) * ANCHOR_STIFFNESS
        : (this.anchor.x - this.pos.x) * ANCHOR_STIFFNESS;
    let offy =
      this.anchor.y > 0
        ? (this.anchor.y - this.pos.y) * ANCHOR_STIFFNESS
        : (this.anchor.y - this.pos.y) * ANCHOR_STIFFNESS;

    this.vel.translate(offx, offy);
    let time = t * t * 0.5;
    let nx = this.pos.x + (this.pos.x - this.last.x) * 0.9 + this.vel.x * time;
    let ny = this.pos.y + (this.pos.y - this.last.y) * 0.9 + this.vel.y * time;
    this.last.copy(this.pos);
    this.pos.set(nx, ny);
  };

  JellyPoint.prototype.think = function () {
    for (let i = 0, len = this.neighbors.length; i < len; i++) {
      let n = this.neighbors[i];
      let dx = this.pos.x - n.pos.x;
      let dy = this.pos.y - n.pos.y;
      let d = Math.sqrt(dx * dx + (dy * dy) / 10);
      let a = ((n.dist - d) / d) * n.strength;
      if (d < n.dist) {
        a /= n.compress;
      }
      let ox = dx * a;
      let oy = dy * a;
      this.vel.translate(+ox, +oy);
      n.vel.translate(-ox, -oy);
    }
  };

  function JellyIsland(pts) {
    this.points = [];
    for (let i = 0, ptslen = pts.length; i < ptslen; i++) {
      this.points.push(new JellyPoint(pts[i][0], pts[i][1]));
    }

    // fixme: finding across neighbors makes this O(n^2)
    for (let i = 0, len = this.points.length; i < len; i++) {
      let jp = this.points[i];
      let pi = i === 0 ? len - 1 : i - 1;
      let ni = i === len - 1 ? 0 : i + 1;
      jp.setNeighbors(this.points[pi], this.points[ni]);
      for (let j = 0; j < len; j++) {
        let ojp = this.points[j];
        if (
          ojp !== jp &&
          ojp !== this.points[pi] &&
          ojp !== this.points[ni] &&
          jp.pos.distance(ojp.pos) <= MAX_ACROSS_NEIGHBOR_DIST
        ) {
          jp.addAcrossNeighbor(ojp);
        }
      }
    }
  }

  JellyIsland.prototype.update = function (mouse) {
    let i,
      len = this.points.length;
    for (i = 0; i < len; i++) this.points[i].think();
    for (i = 0; i < len; i++)
      this.points[i].move(SIMULATION_RATE / 1000, mouse);
  };

  JellyIsland.prototype.wobble = function (amt) {
    for (let i = 0; i < this.points.length; ++i) {
      if (Math.random() < 0.5) continue;
      let dx = amt * (Math.random() - 0.5) * SCALE_X;
      let dy = amt * (Math.random() - 0.5) * SCALE_Y;

      this.points[i].pos.translate(dx, dy);
    }
  };

  function Screen(view) {
    this.view = view;
    this.ctx = this.view.getContext("2d");
    this.ctx.lineWidth = 4;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
  }

  Screen.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.view.width, this.view.height);
  };

  Screen.prototype.drawDots = function (jellies, which, img) {
    for (let i = 0, len = jellies.length; i < len; i++) {
      this.ctx.drawImage(
        img,
        jellies[i][which].x - img.width / 2,
        jellies[i][which].y - img.height / 2,
        img.width,
        img.height
      );
    }
  };

  Screen.prototype.curveBetween = function (p0, p1) {
    this.ctx.quadraticCurveTo(
      p0.x,
      p0.y,
      (p0.x + p1.x) * 0.5,
      (p0.y + p1.y) * 0.5
    );
  };

  Screen.prototype.outlineCurvePath = function (jellies) {
    this.ctx.beginPath();
    this.ctx.moveTo(jellies[0].pos.x, jellies[0].pos.y);
    for (let i = 0, jlen = jellies.length; i <= jlen; ++i) {
      let p0 = jellies[i + 0 >= jlen ? i + 0 - jlen : i + 0].pos;
      let p1 = jellies[i + 1 >= jlen ? i + 1 - jlen : i + 1].pos;
      this.ctx.quadraticCurveTo(
        p0.x,
        p0.y,
        (p0.x + p1.x) * 0.5,
        (p0.y + p1.y) * 0.5
      );
    }
  };

  Screen.prototype.outlineSolidPath = function (jellies) {
    this.ctx.beginPath();
    this.ctx.moveTo(jellies[0].pos.x, jellies[0].pos.y);
    for (let idx = 1, jlen = jellies.length; idx < jlen; ++idx)
      this.ctx.lineTo(jellies[idx].pos.x, jellies[idx].pos.y);
    this.ctx.closePath();
  };

  Screen.prototype.drawIsland = function (island) {
    let jellies = island.points;
    this.ctx.fillStyle = COLOR_FILL;
    this.outlineCurvePath(jellies);
    this.ctx.fill();
  };

  function Mouse(canvas) {
    this.pos = new Vec2(0, 0);
    this.down = false;

    let self = this;
    canvas.onmousemove = function (e) {
      let r = canvas.getBoundingClientRect();
      self.pos.set(e.clientX - r.left, e.clientY - r.top);
      return e.preventDefault();
    };
    canvas.onmouseup = function (e) {
      self.down = false;
      return e.preventDefault();
    };
    canvas.onmousedown = function (e) {
      self.down = true;
      let r = canvas.getBoundingClientRect();
      self.pos.set(e.clientX - r.left, e.clientY - r.top);
      return e.preventDefault();
    };
  }

  let animationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };

  function JellyDemo(canvas, points) {
    this.canvas = canvas;
    this.canvasCtx = this.canvas.getContext("2d");
    this.buffer = this.createBuffer(this.canvas);
    this.screen = new Screen(this.buffer);
    this.island = new JellyIsland(points);
    this.mouse = new Mouse(this.canvas);
    this.tick = JellyDemo.prototype.tick.bind(this);
  }

  JellyDemo.prototype.createBuffer = function (canvas) {
    let buffer = document.createElement("canvas");
    buffer.width = canvas.width;
    buffer.height = canvas.height;
    return buffer;
  };

  JellyDemo.prototype.update = function () {
    this.island.update(this.mouse);
  };

  JellyDemo.prototype.render = function () {
    this.screen.clear();
    this.screen.drawIsland(this.island);
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasCtx.drawImage(
      this.buffer,
      0,
      0,
      this.buffer.width,
      this.buffer.height
    );
  };

  JellyDemo.prototype.stop = function () {
    this.running = false;
  };

  JellyDemo.prototype.start = function () {
    this.lastTick = new Date().getTime();
    this.lastPrint = new Date().getTime();
    this.running = true;
    this.island.wobble(10);
    this.tick();
  };

  JellyDemo.prototype.tick = function () {
    if (!this.running) return;
    let current = new Date().getTime();
    let needed = (SIMULATION_RATE / 1000) * (current - this.lastTick);
    while (needed-- >= 0) {
      this.update();
    }
    this.lastTick = current; // new Date().getTime();
    animationFrame(this.tick);
    this.render();

    if (current - this.lastPrint > 250) {
      this.lastPrint = current;
    }
  };

  function main() {
    let demo = new JellyDemo(document.getElementById("screen"), POINTS);
    demo.start();
  }

  main();
}
