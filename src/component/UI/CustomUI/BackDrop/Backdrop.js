import React from 'react'
import classes from './Backdrop.module.css'

const Backdrop = (props) => {

  const { clicked } = props;
  
  return (
    <div className={classes.Backdrop} onClick={clicked}></div>
  )
}

export default Backdrop
