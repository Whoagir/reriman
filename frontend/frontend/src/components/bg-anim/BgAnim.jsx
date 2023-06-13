import React from 'react'
import Ring1 from './components/ring1';
// import StarAnimation from "../../sky/star"
import { nanoid } from 'nanoid';
import './index.scss'

export const BgAnim = () => {
    const data1 = [
        { speed: 0.15, sz1: 450, sz2: 450, numLines: 20, arcLength: 10 },
        { speed: -0.12, sz1: 500, sz2: 500, numLines: 20, arcLength: 10 },
        { speed: 0.07, sz1: 550, sz2: 550, numLines: 20, arcLength: 10 },
        { speed: -0.13, sz1: 700, sz2: 700, numLines: 11, arcLength: 20 },
        { speed: -0.12, sz1: 750, sz2: 750, numLines: 10, arcLength: 25 },
        { speed: 0.07, sz1: 900, sz2: 900, numLines: 10, arcLength: 30 },
        { speed: 0.03, sz1: 950, sz2: 950, numLines: 10, arcLength: 20 },
        { speed: -0.14, sz1: 1100, sz2: 1100, numLines: 10, arcLength: 20 },
        { speed: 0.12, sz1: 1300, sz2: 1300, numLines: 10, arcLength: 20 },
        { speed: 0.2, sz1: 1350, sz2: 1350, numLines: 2, arcLength: 80 },
        { speed: -0.1, sz1: 1400, sz2: 1400, numLines: 10, arcLength: 20 },
    ];
    if (window.location.href.indexOf('tasks') !== -1) {
        return <></>;
    } else {
        return (
            <div className="sketch">
                {data1.map((item) => (
                    <Ring1 key={nanoid()} data={item} />
                ))}
                {/* <StarAnimation /> */}
                <div className="star1 stars"></div>
                <div className="star2 stars"></div>
                <div className="star3 stars"></div>
                <div className="star4 stars"></div>
                <div className="star5 stars"></div>
                <div className="star6 stars"></div>
                <div className="star7 stars"></div>
                <div className="star8 stars"></div>
                <div className="star9 stars"></div>
                <div className="star10 stars"></div>
                <div className="star11 stars"></div>
                <div className="star12 stars"></div>
                <div className="star13 stars"></div>
                <div className="star14 stars"></div>
                <div className="star15 stars"></div>
                <div className="star16 stars"></div>
                <div className="star17 stars"></div>
            </div>
        )
    }
}
