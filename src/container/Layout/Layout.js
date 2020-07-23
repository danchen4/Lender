import React, { useState } from 'react';
import { NavBar, MyDrawer } from '../../component/Navigation';
import { PageContent, ScFooter } from '../../component/UI/Styled';

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
      <PageContent>{props.children}</PageContent>
      <ScFooter />
    </React.Fragment>
  );
};

export default Layout;
