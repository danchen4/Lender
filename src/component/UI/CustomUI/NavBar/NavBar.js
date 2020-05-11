import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    zIndex: '99',
  },
  toolBar: {
    height: '52px',
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    fontWeight: '500',
    fontSize: '1.25rem',
  },
});

const ButtonAppBar = (props) => {
  const classes = useStyles();
  const tokenREDUX = useSelector((state) => state.auth.token);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar className={classes.toolBar}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={props.toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Enter User Information
          </Typography>
          {tokenREDUX ? (
            <Link className={classes.link} to="/logout">
              Logout
            </Link>
          ) : (
            <Link className={classes.link} to="/login">
              Login
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ButtonAppBar;