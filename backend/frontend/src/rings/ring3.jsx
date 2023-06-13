import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

const Ring3 = (props) => {

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
                p.radians(angle1 + 10),
                p.radians(angle1 + 15)
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
                p.radians(angle1 + 40),
                p.radians(angle1 + 45)
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
                p.radians(angle1 + 70),
                p.radians(angle1 + 75)
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
                p.radians(angle1 + 100),
                p.radians(angle1 + 105)
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
                p.radians(angle1 + 120),
                p.radians(angle1 + 125)
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
                p.radians(angle1 + 170),
                p.radians(angle1 + 175)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 180),
                p.radians(angle1 + 185)
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
                p.radians(angle1 + 200),
                p.radians(angle1 + 205)
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
                p.radians(angle1 + 230),
                p.radians(angle1 + 235)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 240),
                p.radians(angle1 + 245)
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
        };

        // обработчик изменения размеров окна браузера
        // p.windowResized = () => {
        //     p.resizeCanvas(p.windowWidth, p.windowHeight);
        // };
    };

    return <ReactP5Wrapper sketch={sketch} />;
};

export default Ring3;