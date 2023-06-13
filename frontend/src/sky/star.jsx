import React, { Component } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

class StarAnimation extends Component {
  render() {
    return (
        <ReactP5Wrapper sketch={sketch} />
    );
  }
}

const sketch = (p) => {
  let stars = [];

  const createStar = () => {
    let star = {
      x: p.random(p.width),
      y: p.random(p.height),
      z: p.random(p.width),
      speed: p.map(p.random(), 0, 1, 0.5, 1),
    }
    return star;
  }

  const updateStar = (star) => {
    star.z -= star.speed;
    if (star.z < 1) {
      star.z = p.width;
      star.x = p.random(p.width);
      star.y = p.random(p.height);
      star.speed = p.map(p.random(), 0, 1, 0.5, 1);
    }
    return star;
  }

  const showStar = (star) => {
    let sx = p.map(star.x / star.z, 0, 1, 0, p.width);
    let sy = p.map(star.y / star.z, 0, 1, 0, p.height);
    let r = p.map(star.z, 0, p.width, 16, 0);
    p.fill(255);
    p.noStroke();
    p.ellipse(sx, sy, r, r);
  }

  p.setup = () => {
    const canvass = p.createCanvas(window.innerWidth, window.innerHeight);
    canvass.style("position", "absolute")
    canvass.style("top", "0px")
    for (let i = 0; i < 100; i++) {
      stars.push(createStar());
    }
  };

  p.draw = () => {
    p.background(0, 0, 0, 0);
    p.clear()
    for (let i = 0; i < stars.length; i++) {
      stars[i] = updateStar(stars[i]);
      showStar(stars[i]);
    }
  };
};

export default StarAnimation;