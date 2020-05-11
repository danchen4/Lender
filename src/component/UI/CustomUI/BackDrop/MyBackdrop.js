import React from 'react';
import classes from './MyBackdrop.module.css';

const MyBackdrop = (props) => {
  const { clicked } = props;

  return <div className={classes.Backdrop} onClick={clicked}></div>;
};

export default MyBackdrop;
