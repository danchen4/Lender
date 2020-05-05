import React from 'react'
import classes from './MenuBar.module.css'

const MenuBar = (props) => {
  const {clicked, show} = props;

  let classShow = [classes.Bars];

  if (show) {
    classShow.push(classes.Open)
  } else {
    classShow.push(classes.Closed)
  }

  return (
    <div className={classes.MenuBar}>
      <div className={classes.Hamburger} onClick={clicked}>
        <div className={classShow.join(' ')}></div>
        <div className={classShow.join(' ')}></div>
        <div className={classShow.join(' ')}></div>
      </div>
    </div>
  )
}

export default MenuBar;