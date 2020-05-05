import React from 'react'
import classes from './SideDrawer.module.css'

const SideDrawer = (props) => {

  const {show, clicked} = props;

  let classShow = [classes.SideDrawer];
  
  if (show) {
    classShow.push(classes.Open)
  } else {
    classShow.push(classes.Closed)
  }

  return (
      <React.Fragment>
      <div className={classShow.join(' ')}>
        <ul>
          <li>Menu Item 1</li>
          <li>Menu Item 2</li>
          <li>Menu Item 3</li>
        </ul>
      </div>
      </React.Fragment>
  )
}

export default SideDrawer


