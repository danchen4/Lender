import React, { useState } from 'react';
import { NavBar, MyDrawer } from '../../component/Navigation';
import { PageContent } from '../../component/UI/CustomUI/PageContent/PageContent';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.primary.main,
    height: '10rem',
  },
}));

const Layout = (props) => {
  const classes = useStyles();
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
      <Box className={classes.box} component="footer" color="primary" />
    </React.Fragment>
  );
};

export default Layout;
