import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

const Ring10 = (props) => {

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
            p.strokeWeight(2);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 0),
                p.radians(angle1 + 80)
            );
            p.strokeWeight(2);
            p.stroke("white");
            p.noFill();
            p.arc(
                100,
                30,
                size1,
                size2,
                p.radians(angle1 + 150),
                p.radians(angle1 + 250)
            );
        };

        // обработчик изменения размеров окна браузера
        // p.windowResized = () => {
        //     p.resizeCanvas(p.windowWidth, p.windowHeight);
        // };
    };

    return <ReactP5Wrapper sketch={sketch} />;
};

export default Ring10;



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