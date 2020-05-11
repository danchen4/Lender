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
  link: {
    textDecoration: 'none',
    color: '#999ba0',
  },
}));

const MyDrawer = (props) => {
  const classes = useStyles();

  const isAuthenticatedREDUX = useSelector((state) => state.auth.token);

  let list = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <ListItemIcon>
          <HomeIcon color="secondary" />
        </ListItemIcon>
        <ListItemText>
          <Link className={classes.link}>Home</Link>
        </ListItemText>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemIcon>
          <DashboardIcon color="secondary" />
        </ListItemIcon>
        <ListItemText>
          <Link to="/accountdashboard" className={classes.link}>
            Apply Now
          </Link>
        </ListItemText>
      </ListItem>
    </List>
  );
  if (isAuthenticatedREDUX) {
    list = (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <ListItemIcon>
            <HomeIcon color="secondary" />
          </ListItemIcon>
          <ListItemText>
            <Link className={classes.link}>Home</Link>
          </ListItemText>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemIcon>
            <DashboardIcon color="secondary" />
          </ListItemIcon>
          <ListItemText>
            <Link to="/accountdashboard" className={classes.link}>
              Dashboard
            </Link>
          </ListItemText>
        </ListItem>
      </List>
    );
  }

  return (
    <React.Fragment>
      <Drawer
        className={classes.root}
        anchor="left"
        open={props.showDrawer}
        transitionDuration={300}
        onClose={props.closeDrawer}
      >
        {list}
      </Drawer>
    </React.Fragment>
  );
};

export default MyDrawer;
