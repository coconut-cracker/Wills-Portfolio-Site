/*
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






const canvas = document.getElementById("screen")

let pointsArr = [
  [-100, -100], [280, -100], [280, 50], 
  [280, 150],  [280, 250],[280, 350],  [280, 450],  [280, 550],  [280, 650], [280, 750], [280, 850], [280, 950],  [-100, 950] // final [0, 0] is implicit
] 
 // ----------------------------------------

 let path = document.getElementById("path");
 let transform = path.getAttribute("transform"); 
 let transXY = transform.match(/[-]{0,1}[\d]*[.]{0,1}[\d]+/g)
 
 let offsetX = parseInt(transXY[0])
 let offsetY = parseInt(transXY[1])
 
 console.log( offsetX, offsetY)
 
 // The first important function getTotalLength
 let totalLength = path.getTotalLength();
 let intersections = 20;
 
 console.log(totalLength)
 
 let newPoints = []
 
 for(let i = 0; i <= intersections; i ++){
   let distance = i * 1/intersections * totalLength;
   
   // The second important function getPointAtLength
   let point = path.getPointAtLength(distance);
   newPoints.push([point.x + offsetX*0.97, point.y + offsetY*0.97])
 }
 
 console.log(newPoints)
 
 
 



// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

function resize(pointsArr) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render(pointsArr);
}






window.addEventListener('resize', resize, false); resize();
function render() {

  // ------------------------------------------------

 


 
// ----------------------------------------------------------------------

    "use strict";
  
    const COLOR_FILL = "#7de891";
    const COLOR_ANCHOR_DOT = "rgba(152, 65, 52, 0.5)";
  
    const SCALE = 1;
    const DOT_RADIUS = 1;
    const ANCHOR_STIFFNESS = 1;
    const ANCHOR_DAMP = 0.7;
    const MOUSE_FORCE = 2; 
    const MOUSE_RADIUS = 125;
  
    const SIMULATION_RATE = 50;
  
    const XOFF = 1.5;
    const YOFF = 1.5;
  
    const MAX_ACROSS_NEIGHBOR_DIST = 10;
    
    const RANDOM_OFFSET = false;
  
    
  
  
    const POINTS = newPoints.map(function(xy) { 
      if (RANDOM_OFFSET) {
        xy[0] += Math.random()-0.5;
        xy[1] += Math.random()-0.5;
      }
      return [(xy[0] + XOFF) * SCALE, (xy[1] + YOFF) * SCALE];
    });
  
    function Vec2(x, y) { this.x = x; this.y = y; }
    Vec2.prototype.set = function(x, y) { this.x = x; this.y = y; return this; };
    Vec2.prototype.copy = function(v) { return this.set(v.x, v.y); };
    Vec2.prototype.translate = function(x, y) { return this.set(this.x + x, this.y + y); };
    Vec2.prototype.scale = function(v) { return this.set(this.x * v, this.y * v); };
    Vec2.prototype.distance = function(o) {
      let dx = this.x - o.x *1, dy = this.y - o.y /1;
      return Math.sqrt(dx * dx + dy * dy);
    };
  
    function JellyPoint(x, y) {
      this.pos = new Vec2(x, y);
      this.last = new Vec2(x, y);
      this.anchor = new Vec2(x, y);
      this.vel = new Vec2(0, 0);
      this.neighbors = [];
    }
    JellyPoint.prototype.addAcrossNeighbor = function(n) {
      this.addNeighbor(n, 1, 2);
    };
  
    JellyPoint.prototype.addNeighbor = function(n, c, s) {
      this.neighbors.push({
        pos: n.pos, vel: n.vel, dist: this.pos.distance(n.pos), compress: c, strength: s
      });
    };
  
    JellyPoint.prototype.setNeighbors = function(p, n) {
      this.addNeighbor(p, 30, 0.5);
    };
  
    JellyPoint.prototype.move = function(t, m) {
      let dx = m.pos.x - this.pos.x;
      let dy = m.pos.y - this.pos.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (!m.down) {     
        if (dist < MOUSE_RADIUS) {
          this.vel.x += dx * MOUSE_FORCE;
          this.vel.y += dy * (MOUSE_FORCE / 10);
        } 
      } else if (m.down){     
        if (dist < MOUSE_RADIUS ) {
          this.vel.x -= dx * MOUSE_FORCE;
          this.vel.y -= dy * (MOUSE_FORCE / 10);
        }  
      }
      this.vel.scale(ANCHOR_DAMP);
      let offx = (this.anchor.x - this.pos.x) * ANCHOR_STIFFNESS;
      let offy = (this.anchor.y - this.pos.y) * ANCHOR_STIFFNESS;
      this.vel.translate(offx, offy);
      let time = t * t * 0.5;
      let nx = this.pos.x + (this.pos.x - this.last.x) * 0.9 + this.vel.x * time;
      let ny = this.pos.y + (this.pos.y - this.last.y) * 0.9 + this.vel.y * time;
      this.last.copy(this.pos);
      this.pos.set(nx, ny);
    };
  
    JellyPoint.prototype.think = function() {
      for (let i = 0, len = this.neighbors.length; i < len; i++) {
        let n = this.neighbors[i];
        let dx = this.pos.x - n.pos.x;
        let dy = this.pos.y - n.pos.y;
        let d = Math.sqrt(dx * dx + dy * dy/10);
        let a = (n.dist - d) / d * n.strength;
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
        let pi = i === 0 ? len-1 : i - 1;
        let ni = i === len-1 ? 0 : i + 1;
        jp.setNeighbors(this.points[pi], this.points[ni]);
        for (let j = 0; j < len; j++) {
          let ojp = this.points[j];
          if (ojp !== jp && ojp !== this.points[pi] && ojp !== this.points[ni]
              && jp.pos.distance(ojp.pos) <= MAX_ACROSS_NEIGHBOR_DIST) {
            jp.addAcrossNeighbor(ojp);
          }
        }
      }
    }
    
    JellyIsland.prototype.update = function(mouse) {
      let i, len = this.points.length;
      for (i = 0; i < len; i++) this.points[i].think();
      for (i = 0; i < len; i++) this.points[i].move(SIMULATION_RATE / 1000, mouse);
    };
  
    JellyIsland.prototype.wobble = function(amt) {
      for (let i = 0; i < this.points.length; ++i) {
        if (Math.random() < 0.5) continue;
        let dx = amt * (Math.random()-0.5) * SCALE;
        let dy = amt * (Math.random()-0.5) * SCALE;
        this.points[i].pos.translate(dx, dy);
      }
    }
    
  
  
    function Screen(view) {
      this.aImg = this.cacheDotImg(COLOR_ANCHOR_DOT);
      this.view = view;
      this.ctx = this.view.getContext('2d');
      this.ctx.lineWidth = 4;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
    }
  
    Screen.prototype.cacheDotImg = function(color) {
      let c = document.createElement('canvas');
      c.width = (DOT_RADIUS+5)*2;
      c.height = (DOT_RADIUS+5)*2;
      let x = c.getContext('2d');
      x.lineWidth = 3;
      x.lineCap = 'round';
      x.lineJoin = 'round';
      x.strokeStyle = color;
      x.beginPath();
      x.arc(DOT_RADIUS+5, DOT_RADIUS+5, DOT_RADIUS, 0, Math.PI*2, true);
      x.stroke();
      return c;
    };
  
    Screen.prototype.clear = function() {
      this.ctx.clearRect(0, 0, this.view.width, this.view.height);
    };
  
    Screen.prototype.drawDots = function(jellies, which, img) {
      for (let i = 0, len = jellies.length; i < len; i++) {
        this.ctx.drawImage(img, jellies[i][which].x-img.width/2, jellies[i][which].y-img.height/2, img.width, img.height);
  
  
      }
    };
  
    Screen.prototype.curveBetween = function(p0, p1) {
      this.ctx.quadraticCurveTo(p0.x, p0.y, (p0.x+p1.x) * 0.5, (p0.y+p1.y) * 0.5);
    };
  
    Screen.prototype.outlineCurvePath = function(jellies) {
      this.ctx.beginPath();
      this.ctx.moveTo(jellies[0].pos.x, jellies[0].pos.y);
      for (let i = 0, jlen=jellies.length; i <= jlen; ++i) {
        let p0 = jellies[i+0 >= jlen ? i+0-jlen : i+0].pos;
        let p1 = jellies[i+1 >= jlen ? i+1-jlen : i+1].pos;
        this.ctx.quadraticCurveTo(p0.x, p0.y, (p0.x+p1.x) * 0.5, (p0.y+p1.y) * 0.5)
      }
    };
  
    Screen.prototype.outlineSolidPath = function(jellies) {
      this.ctx.beginPath();
      this.ctx.moveTo(jellies[0].pos.x, jellies[0].pos.y);
      for (let idx = 1, jlen = jellies.length; idx < jlen; ++idx)
        this.ctx.lineTo(jellies[idx].pos.x, jellies[idx].pos.y);
      this.ctx.closePath();
    };
  
    Screen.prototype.drawIsland = function(island) {
      let jellies = island.points;
      let jlen = jellies.length;
      this.ctx.fillStyle = COLOR_FILL;
     
        this.outlineCurvePath(jellies);
        this.ctx.fill();
      
  
     
  
     
    };
  
  
  
    function Mouse(canvas) {
      this.pos = new Vec2(0, 0);
      this.down = false;
  
      let self = this;
      canvas.onmousemove = function(e) {
        let r = canvas.getBoundingClientRect();
        self.pos.set(e.clientX - r.left, e.clientY - r.top);
        return e.preventDefault();
      };
      canvas.onmouseup = function(e) {
        self.down = false;
        return e.preventDefault();
      };
      canvas.onmousedown = function(e) {
        self.down = true;
        let r = canvas.getBoundingClientRect();
        self.pos.set(e.clientX - r.left, e.clientY - r.top);
        return e.preventDefault();
      };
    }
  
  
    let animationFrame = window.requestAnimationFrame ||
                         window.webkitRequestAnimationFrame ||
                         window.mozRequestAnimationFrame ||
                         window.oRequestAnimationFrame ||
                         window.msRequestAnimationFrame ||
                         function (callback) { window.setTimeout(callback, 1000 / 60); };
  
  
    function JellyDemo(canvas, points) {
      this.canvas = canvas;
      this.canvasCtx = this.canvas.getContext('2d');
      this.buffer = this.createBuffer(this.canvas);
      this.screen = new Screen(this.buffer);
      this.island = new JellyIsland(points);
      this.mouse = new Mouse(this.canvas);
      this.tick = JellyDemo.prototype.tick.bind(this);
  
    }
  
    JellyDemo.prototype.createBuffer = function(canvas) {
      let buffer = document.createElement('canvas');
      buffer.width = canvas.width;
      buffer.height = canvas.height;
      return buffer;
    };
  
    JellyDemo.prototype.update = function() {
      this.island.update(this.mouse);
    };
  
    JellyDemo.prototype.render = function() {
      this.screen.clear();
      this.screen.drawIsland(this.island);
      this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvasCtx.drawImage(this.buffer, 0, 0, this.buffer.width, this.buffer.height);
    };
  
    JellyDemo.prototype.stop = function() {
      this.running = false;
    };
  
    JellyDemo.prototype.start = function() {
      this.lastTick = new Date().getTime();
      this.lastPrint = new Date().getTime();
      this.running = true;
      this.island.wobble(0.1);
      this.tick();
    };
  
    JellyDemo.prototype.tick = function() {
      if (!this.running) return;
      let current = new Date().getTime();
      let needed = (SIMULATION_RATE/1000)*(current-this.lastTick);
      while (needed-- >= 0) {
        this.update();
      }
      this.lastTick = current; // new Date().getTime();
      animationFrame(this.tick);
      this.render();
  
      if (current-this.lastPrint > 250) {
     
        this.lastPrint = current;
      }
  
    };
    
  
    function main() {
      let demo = new JellyDemo(document.getElementById('screen'), POINTS);
      demo.start();
    };
  
    main();
  
  };










