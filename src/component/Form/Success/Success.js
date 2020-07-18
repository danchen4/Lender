import React from 'react';
// Material UI
import { Button, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// CSS
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
  },
  header1: {
    padding: '1rem 0',
  },
  body1: {
    fontSize: '2rem',
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
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledMessage = styled.div`
  padding: 2rem;
  font-size: 2rem;
`;

const FormPersonal = (props) => {
  const classes = useStyles();
  const { pathNext, history } = props;

  console.log('<FormSuccess /> RENDER');

  const nextStep = () => {
    history.push({ pathname: pathNext });
  };

  return (
    <div className={classes.root}>
      <Box component="div" className={classes.box}>
        <Paper className={classes.paper} elevation={2}>
          <Typography variant="h4" color="primary" className={classes.header1}>
            Success!
          </Typography>
          <StyledMessage>
            <Typography color="secondary" classes={{ body1: classes.body1 }}>
              Thank you for your submission.
            </Typography>
          </StyledMessage>
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
