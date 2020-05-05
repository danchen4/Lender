import React from 'react'

import { Button, Typography, List, ListSubheader, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../theme';

const useStyles = makeStyles({
  root: {
    marginTop: '30px',
  },
  list: {
    margin: 'auto',
    width: '500px',
    textAlign: 'center',
  },
  listItem: {
    textAlign: 'center',
  },
  button: {
    margin: '1rem',
    backgroundColor: customTheme.palette.primary.dark,
  }
});


const FormPersonal = (props) => {
  const classes = useStyles();

  console.log('<FormSuccess /> RENDER')

  return (
    <div className={classes.root}>
      <Typography variant="h4" color="primary">Success</Typography>
      <Typography variant="p" color="secondary">Thank you for your submission.</Typography>
    </div>
  )
}

export default FormPersonal;