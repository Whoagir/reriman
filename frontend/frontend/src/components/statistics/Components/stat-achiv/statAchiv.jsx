import React from 'react'
import './statAchiv.scss'

import { BiLeftArrowAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom';

export const StatAchiv = () => {

  const images = {};
  const pngFiles = require.context('../stat-main/images/bwgg', true, /\.png$/);
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
    <div className="stat__bottom" style={{ color: "white" }}>
      <div className="statachiv-container">
        <div className="statachiv-navbar">
          <div className="regwindow__leftarrow">
            <Link to="/tasks/statistics"><BiLeftArrowAlt size={22} className="regwindow__leftarrowico" /></Link>
          </div>
        </div>
        <div className="statachiv-main">
          {Object.keys(images).map((key, ind) => (
            <div className="statachiv-slider-item df fdc jcse" key={ind}>
              <div className="statachiv-slider-item-image">
                <img key={ind} src={images[key]} alt={key} />
              </div>
              <div className="statachiv-slider-item-text">
                <p style={{ fontSize: '20px' }}>{names[ind]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
