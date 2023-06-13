import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

const Ringring = ({ data }) => {
    const { speed, sz1, sz2, numLines, arcLength } = data;
    let angle1 = 0;
    let speedy = speed;
    let size1 = sz1;
    let size2 = sz2;
    let x = 1400;
    let y = 1400;
    let num = numLines;
    let arc = arcLength;

    const sketch = (p) => {
        p.setup = () => {
            const canvas = p.createCanvas(x, y);
            canvas.background(0, 0, 0, 0);
            canvas.style('position', 'absolute');
        };

        p.draw = () => {
            p.clear();
            angle1 += speedy;

            p.strokeWeight(4);
            p.stroke('white');
            p.noFill();

            const angleStep = 360 / num;

            for (let i = 0; i < num; i++) {
                const startAngle = angle1 + i * angleStep;
                const endAngle = startAngle + arc;

                p.arc(100, 30, size1, size2, p.radians(startAngle), p.radians(endAngle));
            }
        };
    };

    return <ReactP5Wrapper sketch={sketch} />;
};

export default Ringring;
