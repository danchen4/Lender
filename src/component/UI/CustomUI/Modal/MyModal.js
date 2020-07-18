import React from 'react';
import classModule from './MyModal.module.css';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spacer: {
    margin: '18px 0',
  },
  button: {
    margin: '1rem',
    backgroundColor: theme.palette.error.light,
    color: 'white',
  },
}));

export const MyModal = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classModule.Modal}>
        <div className={classes.spacer}>{props.children}</div>
        <br />
        <Button className={classes.button} variant="contained" onClick={props.clicked}>
          Dismiss
        </Button>
      </div>
    </React.Fragment>
  );
};

export default MyModal;
