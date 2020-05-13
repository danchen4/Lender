import React, { useState, useEffect } from 'react';

import classModule from './WordCarousel.module.css';

const Word = ({ word }) => <div className={classModule.Word}>{word}</div>;

const WordCarousel = ({ wordArray }) => {
  console.log(wordArray);
  const [word, setWord] = useState('');
  const [showWord, setShowWord] = useState(false);

  let delay1 = 1000;

  useEffect(() => {
    setWord(wordArray.shift());
    let id1 = setTimeout(() => {
      setShowWord(true);
    }, delay1);
    return () => {
      clearTimeout(id1);
    };
  }, [wordArray]);

  return <React.Fragment>{showWord ? <Word word={word} /> : null}</React.Fragment>;
};

export default WordCarousel;
