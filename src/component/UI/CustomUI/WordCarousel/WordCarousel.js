import React, { useState, useEffect } from 'react';
import { AnimateOnChange, HideUntilLoaded } from 'react-animation';

import './WordCarousel.css';

const WordCarousel = ({ wordArray }) => {
  console.log('RENDER');
  const [current, setCurrent] = useState(0);
  let delay = 2000;

  useEffect(() => {
    const id = setTimeout(() => {
      if (current === wordArray.length - 1) {
        setCurrent(0);
      } else {
        setCurrent((prevState) => prevState + 1);
      }
    }, delay);
    return () => {
      clearTimeout(id);
    };
  });

  return (
    <React.Fragment>
      <div className="AnimatedWordContainer">
        <AnimateOnChange
          animationIn="custom-animation-in 800ms ease-out"
          animationOut="custom-animation-out 800ms ease-out"
          className="AnimatedWord"
        >
          {wordArray[current]}
        </AnimateOnChange>
      </div>
    </React.Fragment>
  );
};

export default WordCarousel;
