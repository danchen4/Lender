import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '400px',
  },
  list: {
    width: '200px',
  },
  listItem: {
    padding: '16px',
  },
  listItemText: {
    fontSize: '1.4rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.6rem',
    },
  },
  icon: {
    height: '2rem',
    width: '2rem',
  },
  link: {
    textDecoration: 'none',
    color: '#999ba0',
  },
}));

export const MyDrawer = ({ showDrawer, closeDrawer }) => {
  const classes = useStyles();

  const isAuthenticatedREDUX = useSelector((state) => state.auth.token);

  let list = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <ListItemIcon>
          <HomeIcon classes={{ root: classes.icon }} color="secondary" />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.listItemText }}>
          <Link to="/" className={classes.link} onClick={closeDrawer}>
            Home
          </Link>
        </ListItemText>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemIcon>
          <DashboardIcon classes={{ root: classes.icon }} color="secondary" />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.listItemText }}>
          <Link
            to={isAuthenticatedREDUX ? '/accountdashboard' : '/signup'}
            className={classes.link}
            onClick={closeDrawer}
          >
            {isAuthenticatedREDUX ? 'Dashboard' : 'Apply Now'}
          </Link>
        </ListItemText>
      </ListItem>
    </List>
  );

  return (
    <React.Fragment>
      <Drawer
        className={classes.root}
        anchor="left"
        open={showDrawer}
        transitionDuration={300}
        onClose={closeDrawer}
      >
        {list}
      </Drawer>
    </React.Fragment>
  );
};

export default MyDrawer;
