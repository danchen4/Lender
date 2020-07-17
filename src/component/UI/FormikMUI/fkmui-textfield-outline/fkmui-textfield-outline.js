import React from 'react';
// Formik
import { useField } from 'formik';
// CSS
import classes from './fkmui-textfield-outline.module.css';
// Material UI
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: (customStyle) => (customStyle.width || 100) + '%',
  },
  label: {
    fontSize: (customStyle) => (customStyle.fontSize || 1.6) + 'rem',
    paddingRight: '1rem',
    textAlign: 'left',
    backgroundColor: 'white',
    [theme.breakpoints.down('sm')]: {
      fontSize: (customStyle) => (parseInt(customStyle.fontSize * 0.7) || 1.2) + 'rem',
    },
  },
  input: {
    fontSize: (customStyle) => (customStyle.fontSize || 1.6) + 'rem', // in order for input field to match font-size on label, must also adapt height to font-size
    [theme.breakpoints.down('sm')]: {
      fontSize: (customStyle) => (parseInt(customStyle.fontSize * 0.7) || 1.2) + 'rem',
    },
  },
  helperText: {
    fontSize: (customStyle) => (customStyle.errorFontSize || 1.4) + 'rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: (customStyle) => (parseInt(customStyle.fontSize * 0.7) || 1.2) + 'rem',
    },
  },
}));

export const MyTextField = ({
  name,
  label,
  required,
  secondary,
  autoFocus = false,
  customStyle,
}) => {
  const classesMUI = useStyles(customStyle);

  const [fieldprops, meta] = useField(name);
  const errorText = meta.error && meta.touched && meta.error;

  return (
    <TextField
      {...fieldprops}
      className={
        meta.error && meta.touched
          ? `${classesMUI.textField} ${classes.Shake}`
          : classesMUI.textField
      }
      InputProps={{
        classes: {
          input: classesMUI.input,
        },
      }}
      InputLabelProps={{
        className: classesMUI.label,
      }}
      FormHelperTextProps={{
        className: classesMUI.helperText,
      }}
      variant="outlined"
      color={secondary && 'secondary'}
      label={label}
      required={required}
      helperText={errorText}
      error={!!errorText}
      autoFocus={autoFocus}
    />
  );
};
