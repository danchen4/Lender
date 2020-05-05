import React from 'react'

import { Button, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    marginTop: '30px',
  },
  textField: {
    maxWidth: '400px',
    width: '100%',
    padding: '0 0.5rem',
  },
  customStyle: {
    fontStyle: 'italic',
  },
  button: {
    margin: '1rem',
  },
  label: {
    marginLeft: '0.4em'
  }
});

const Input = (props) => {
  const classes = useStyles();

  const {required, inputType, type, label, value, validate, valid, touched, changed} = props;

  let inputElement = null;
  let validationError;
  if (valid) {
    validationError = true;
  }

   switch (inputType) {
    case ('input'):
      inputElement= 
        <TextField         
          className={classes.textField}
          InputLabelProps={{className: classes.label}}
          variant="outlined"
          margin="normal"  
          required={required}
          label={label}
          value={value}
          type={type}
          error={validationError}
          onChange={changed}
        />
      break;
    default: 
    inputElement= null;
      break;
    }

  return (
    <React.Fragment>
      {inputElement}
    </React.Fragment>
  )
}

export default Input;
