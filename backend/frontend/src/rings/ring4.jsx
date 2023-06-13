import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

const Ring4 = (props) => {

    const { speed, sz1, sz2, xcoor, ycoor } = props;
    let angle1 = 0;
    let speedy = speed;
    let size1 = sz1;
    let size2 = sz2;
    let x = xcoor;
    let y = ycoor;

    const sketch = (p) => {
        p.setup = () => {
            const canvas = p.createCanvas(x, y);
            canvas.background(0, 0, 0, 0);
            canvas.style("position", "absolute")
            canvas.style("top", "0px")
        };

        p.draw = () => {
            p.clear()
            angle1 += speedy;

            // первая дуга
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1),
                p.radians(angle1 + 5)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 20),
                p.radians(angle1 + 25)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 30),
                p.radians(angle1 + 35)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 50),
                p.radians(angle1 + 55)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 60),
                p.radians(angle1 + 65)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 80),
                p.radians(angle1 + 85)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 90),
                p.radians(angle1 + 95)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 110),
                p.radians(angle1 + 115)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 130),
                p.radians(angle1 + 135)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 140),
                p.radians(angle1 + 145)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 150),
                p.radians(angle1 + 155)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 160),
                p.radians(angle1 + 165)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 190),
                p.radians(angle1 + 195)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 210),
                p.radians(angle1 + 215)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 220),
                p.radians(angle1 + 225)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 250),
                p.radians(angle1 + 255)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 260),
                p.radians(angle1 + 265)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 280),
                p.radians(angle1 + 285)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 300),
                p.radians(angle1 + 305)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 310),
                p.radians(angle1 + 315)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 320),
                p.radians(angle1 + 325)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 350),
                p.radians(angle1 + 355)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 370),
                p.radians(angle1 + 375)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 380),
                p.radians(angle1 + 385)
            );
        };

    };

    return <ReactP5Wrapper sketch={sketch} />;
};

export default Ring4;