import React, { useState, useEffect } from 'react';
import { AnimateOnChange } from 'react-animation';
import styled from 'styled-components';
import './WordCarousel.css';
import { COLOR } from '../../../../theme';

const StyledAnimate = styled(AnimateOnChange)`
  font-size: 3rem;
  font-weight: 700;
  color: ${COLOR.main.grey2};
  @media ${({ theme }) => theme.bp.phone} {
    font-size: 1.8rem;
    font-weight: 500;
  }
`;

const WordCarousel = ({ wordArray }) => {
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
        <StyledAnimate
          animationIn="custom-animation-in 800ms ease-out"
          animationOut="custom-animation-out 800ms ease-out"
        >
          {wordArray[current]}
        </StyledAnimate>
      </div>
    </React.Fragment>
  );
};

export default WordCarousel;
