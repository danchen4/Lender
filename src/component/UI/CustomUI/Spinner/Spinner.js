import React from 'react';
import classes from './Spinner.module.css';

export const Spinner = () => {
  return (
    <div className={classes.centerInner}>
      <div className={classes.loader}>Loading...</div>
    </div>
  );
};

export default Spinner;
