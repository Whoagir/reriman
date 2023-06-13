import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

const Ring6 = (props) => {

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
                p.radians(angle1 + 340),
                p.radians(angle1 + 345)
            );
            p.strokeWeight(4);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 360),
                p.radians(angle1 + 365)
            );
        };

        // обработчик изменения размеров окна браузера
        // p.windowResized = () => {
        //     p.resizeCanvas(p.windowWidth, p.windowHeight);
        // };
    };

    return <ReactP5Wrapper sketch={sketch} />;
};

export default Ring6;