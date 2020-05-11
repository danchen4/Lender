import React from 'react';

import { Button, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../../theme';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
  },
  header1: {
    padding: '1rem 0',
  },
  box: {
    padding: '0.5rem',
  },
  paper: {
    maxWidth: '600px',
    margin: 'auto',
    borderRadius: '6px',
    padding: theme.spacing(2),
  },
  spacer: {
    margin: '24px 0',
  },
  button: {
    margin: '1rem',
    backgroundColor: customTheme.palette.primary.dark,
  },
}));

const FormPersonal = (props) => {
  const classes = useStyles();
  const { pathNext } = props;

  console.log('<FormSuccess /> RENDER');

  const nextStep = () => {
    props.history.push({ pathname: pathNext });
  };

  return (
    <div className={classes.root}>
      <Box component="div" className={classes.box}>
        <Paper className={classes.paper} elevation={2}>
          <Typography variant="h4" color="primary" className={classes.header1}>
            Success
          </Typography>
          <Typography variant="body1" color="secondary">
            Thank you for your submission.
          </Typography>
          <div className={classes.spacer}>
            <Button variant="contained" color="secondary" size="large" onClick={nextStep}>
              Go To Application Dashboard
            </Button>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

export default FormPersonal;
