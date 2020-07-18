import React from 'react';
// Redux
import { useSelector } from 'react-redux';
// Router
import { Link, withRouter } from 'react-router-dom';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../images/lender-logo.png';

const useStyles = makeStyles((theme) => ({
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
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1.4rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.6rem',
    },
  },
  button: {
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  icon: {
    color: theme.palette.secondary.main,
    height: '3rem',
    width: '3rem',
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      width: '160px',
    },
  },
}));

export const ButtonAppBar = (props) => {
  const classes = useStyles();
  const tokenREDUX = useSelector((state) => state.auth.token);

  const goHome = () => {
    props.history.push({ pathname: '/' });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar className={classes.toolBar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            size="medium"
            onClick={props.toggleDrawer}
          >
            <MenuIcon classes={{ root: classes.icon }} />
          </IconButton>
          <div className={classes.button} onClick={goHome}>
            <img className={classes.logo} src={logo} alt="logo" />
          </div>
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

export default withRouter(ButtonAppBar);
