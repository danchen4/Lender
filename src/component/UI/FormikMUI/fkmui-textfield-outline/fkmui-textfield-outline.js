import React from 'react'
import PropTypes from 'prop-types';
import classModule from './fkmui-textfield-outline.module.css'


import {TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useField } from 'formik';

const useStyles = makeStyles({
    textField: {
      width: customStyle=> customStyle.width || null,
    }
  }
);

const MyTextField =({ autoFocus, label, type, required, ...props }) => {
  const { customStyle } = props
  const classes = useStyles(customStyle);

  const [fieldprops, meta] = useField(props);
  const errorText = meta.error && meta.touched && meta.error;


  return (
    <TextField
      {...fieldprops}
      type={type}
      required={required}
      className={meta.error && meta.touched ? `${classes.textField} ${classModule.Shake}` : classes.textField}
      helperText={errorText}
      error={!!errorText}
      variant="outlined"
      label={label}
      autoFocus={autoFocus}
    />
  );
};

MyTextField.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
}

export default MyTextField;