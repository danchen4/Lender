import React, { useState } from 'react';
// Formik
import { useField } from 'formik';
// CSS
import classes from './fkmui-textfield-password.module.css';
// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormHelperText } from '@material-ui/core';

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
  error: {
    color: `${theme.palette.error.main} !important`,
  },
  input: {
    fontSize: (customStyle) => (customStyle.fontSize || 1.6) + 'rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: (customStyle) => (parseInt(customStyle.fontSize * 0.7) || 1.2) + 'rem',
    },
  },
  errorMessage: {
    color: theme.palette.error.main,
    margin: '3px 14px 0 14px',
    fontSize: '1.4rem',
    textAlign: 'left',
    fontWeight: 'normal',
    lineHeight: '1.66',
    letterSpacing: '0.03333em',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
  },
}));

export const MyPasswordTextField = ({ name, label, required, secondary, customStyle }) => {
  const classesMUI = useStyles(customStyle);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldprops, meta] = useField(name);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const errorText = meta.error && meta.touched && meta.error;
  return (
    <React.Fragment>
      <FormControl
        className={
          meta.error && meta.touched
            ? `${classesMUI.textField} ${classes.Shake}`
            : classesMUI.textField
        }
        variant="outlined"
      >
        <InputLabel
          className={
            meta.error && meta.touched
              ? `${classesMUI.label} ${classesMUI.error}`
              : classesMUI.label
          }
        >
          {label}
        </InputLabel>
        <OutlinedInput
          {...fieldprops}
          type={showPassword ? 'text' : 'password'}
          inputProps={{ className: classesMUI.input }}
          color={secondary && 'secondary'}
          required={required}
          error={!!errorText}
          label={label}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormHelperText className={classesMUI.errorMessage}>{errorText}</FormHelperText>
    </React.Fragment>
  );
};
