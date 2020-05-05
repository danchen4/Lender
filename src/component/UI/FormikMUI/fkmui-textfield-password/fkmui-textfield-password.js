import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classModule from './fkmui-textfield-password.module.css';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { useField, ErrorMessage } from 'formik';

const useStyles = makeStyles({
  textField: {
    width: (customStyle) => customStyle.width || null,
  },
  errorMessage: {
    color: 'rgba(164, 49, 41, 1)',
    margin: '3px 14px 0 14px',
    fontSize: '0.75rem',
    textAlign: 'left',
    fontWeight: '400',
    lineHeight: '1.66',
    letterSpacing: '0.03333em',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

const MyPasswordTextField = ({ label, required, ...props }) => {
  const { customStyle } = props;
  const classes = useStyles(customStyle);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldprops, meta] = useField(props);

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
            ? `${classes.textField} ${classModule.Shake}`
            : classes.textField
        }
        variant="outlined"
      >
        <InputLabel>{label}</InputLabel>
        <OutlinedInput
          type={showPassword ? 'text' : 'password'}
          {...fieldprops}
          required={required}
          error={!!errorText}
          variant="outlined"
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
      <ErrorMessage>{() => <div className={classes.errorMessage}>{errorText}</div>}</ErrorMessage>
    </React.Fragment>
  );
};

MyPasswordTextField.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
};

export default MyPasswordTextField;
