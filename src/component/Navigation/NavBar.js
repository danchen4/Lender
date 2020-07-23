import React from 'react';
// Redux
import { useSelector } from 'react-redux';
// Router
import { withRouter } from 'react-router-dom';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// Components
import { ScLink, ScHeader, ScFlexBox } from '../UI/Styled';
// Misc.
import { COLOR } from '../../theme';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: '99',
  },
  color: {
    backgroundColor: COLOR.light.grey1,
  },
  toolBar: {
    height: '52px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    color: theme.palette.text.primary,
    height: '3rem',
    width: '3rem',
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
      <AppBar position="static" color="primary" classes={{ colorPrimary: classes.color }}>
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
          <ScLink to="/">
            <ScFlexBox>
              {/* <Logo2
                width="5rem"
                height="5rem"
                defaultColor="#000"
                fillColor={COLOR.main.secondary}
              /> */}
              <ScHeader color="secondary" fontSize={3}>
                LENDER
              </ScHeader>
            </ScFlexBox>
          </ScLink>
          {tokenREDUX ? (
            <ScLink color="text" to="/logout">
              Logout
            </ScLink>
          ) : (
            <ScLink color="text" to="/login">
              Login
            </ScLink>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(ButtonAppBar);
