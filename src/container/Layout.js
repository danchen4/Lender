import React, {useState} from 'react'
import MenuBar from '../component/UI/CustomUI/MenuBar/MenuBar';
import SideDrawer from '../component/UI/CustomUI/SideDrawer/SideDrawer';
import Backdrop from '../component/UI/CustomUI/BackDrop/Backdrop'

import classes from './Layout.module.css'

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false)

  const showSideDrawerHandler = () => {
    setShowSideDrawer(!showSideDrawer);
    // setShowSideDrawer(prevState => {return {showSideDrawer: !prevState.showSideDrawer}});
    console.log('hello');
  }

  return (
 
      <div className={classes.Layout}>
        <MenuBar 
          clicked={showSideDrawerHandler}
          show={showSideDrawer}
        />
        {showSideDrawer && <Backdrop clicked={showSideDrawerHandler}/>}
        <SideDrawer
          show={showSideDrawer}
          clicked={showSideDrawerHandler}
        />
      </div>
  )
}

export default Layout