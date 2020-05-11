import React, { useState } from 'react';
import NavBar from '../../component/UI/CustomUI/NavBar/NavBar';
import MyDrawer from '../../component/UI/CustomUI/Drawer/Drawer';
import classModule from './Layout.module.css';

const Layout = (props) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawerHandler = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setShowDrawer(!showDrawer);
  };

  return (
    <React.Fragment>
      <NavBar toggleDrawer={toggleDrawerHandler} />
      <MyDrawer showDrawer={showDrawer} closeDrawer={toggleDrawerHandler} />
      {props.children}
    </React.Fragment>
  );
};

export default Layout;
