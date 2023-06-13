import React from "react";
import { BsCaretLeft, BsCaretRight } from "react-icons/bs";

export const Slider = () => {
    const prevSlide = () => {
        const slider = document.querySelector(".slider__items")
        slider.scrollBy({
            left: -150,
            behavior: 'smooth',
        });
    };
    const nextSlide = () => {
        const slider = document.querySelector(".slider__items")
        slider.scrollBy({
            left: 150,
            behavior: 'smooth',
        });
    };

    const images = {};
    const pngFiles = require.context('../images/bwgg', true, /\.png$/);
    pngFiles.keys().forEach((key) => {
        images[key] = pngFiles(key);
    });

    const names = [
        'Hatiko', 'Qiwi', 'Fox', 'Crab', 'Lazy', 'Stubborn', 'Pretend', 'Whale',
        'Cat', 'Ant', 'Anteater', 'Bat', 'Bear', 'Beaver', 'Parrot', 'Bee',
        'Camel', 'Croc', 'Invisible', 'Shell', 'Chicken', 'Elephant', 'Fish', 'Frog',
        'Gragon', 'Giraffe', 'Rabbit', 'Hedgehog', 'Jellyfish', 'Koala', 'Octopus', 'Penguin',
        'Turtle', 'Unicorn', 'Duck', 'Snake', 'Stingray', 'Shrimp', 'Sheep', 'Hippopo',
        'Starfish', 'Seahorse', 'Snail', 'Seacow', 'Gull',
    ];

    return (
        <div className="slider-div1">
            <div
                className="slider__control slider__control--left"
                onClick={prevSlide}
            >
                <BsCaretLeft size={30} />
            </div>
            <div className="slider-div">
                <div className="slider">
                    <div className="slider__items">
                        {Object.keys(images).map((key, ind) => (
                            <div className="slider__item" key={ind}>
                                <div className="slider__item-image">
                                    <img key={ind} className="slider__item-image-image" src={images[key]} alt={key} />
                                </div>
                                <div className="slider__item-text">
                                    <p>{names[ind] ? names[ind] : 'Soon'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div
                className="slider__control slider__control--right"
                onClick={nextSlide}
            >
                <BsCaretRight size={30} />
            </div>
        </div>
    );
};