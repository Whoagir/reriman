import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

const Ring9 = (props) => {

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
                p.radians(angle1 + 290),
                p.radians(angle1 + 295)
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
                p.radians(angle1 + 350),
                p.radians(angle1 + 355)
            );
        };

        // обработчик изменения размеров окна браузера
        // p.windowResized = () => {
        //     p.resizeCanvas(p.windowWidth, p.windowHeight);
        // };
    };

    return <ReactP5Wrapper sketch={sketch} />;
};

export default Ring9;



// const Sketch = (props) => {
//     const { width, height } = props;

//     const setup = (p5, canvasParentRef) => {
//         p5.createCanvas(width, height).parent(canvasParentRef);
//         p5.noStroke();
//     };

//     const draw = (p5) => {
//         p5.background("red");
//         p5.ellipse(p5.width / 2, p5.height / 2, 100, 100);
//     };

//     return <ReactP5Wrapper setup={setup} draw={draw} />;
// };





// export default Sketch;

// export default function App({ speed }) {
//     const sketch = (p5) => {
//         p5.createCanvas(500, 500);
//         p5.background("red");
//     }
//     const draw = (p5) => {
//         p5.background("red");
//     }
//     return <ReactP5Wrapper sketch={sketch} draw={draw} speed={speed} />;
// }


// function Sketch(props) {
//     const speed = props.speed;
//     const sketch = (p5) => {
//         const canvas = p5.createCanvas(500, 500);
//         canvas.background("red")
//     };
//     const draw = (p5) => {
//         let a = speed;
//     };
//     return <ReactP5Wrapper sketch={sketch} draw={draw} />;
// }
// export default Sketch;