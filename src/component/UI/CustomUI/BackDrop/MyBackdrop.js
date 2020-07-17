import React from 'react';
import classes from './MyBackdrop.module.css';

const MyBackdrop = ({ clicked }) => <div className={classes.Backdrop} onClick={clicked} />;

export default MyBackdrop;
