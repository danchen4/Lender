import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
// TextMask
import { NumberFormatCustom } from './components/NumberFormat';
// CSS
import './shake.css';

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

export const MyMaskedTextFieldCurrency = ({ label, required, secondary, customStyle, name }) => {
  const classesMUI = useStyles(customStyle);
  const [fieldprops, meta, handler] = useField(name);
  const errorText = meta.error && meta.touched && meta.error;
  const [values, setValues] = useState({
    numberformat: '0',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    handler.setValue(event.target.value);
  };

  return (
    <TextField
      {...fieldprops}
      className={
        meta.error && meta.touched ? `${classesMUI.textField} Shake` : classesMUI.textField
      }
      InputProps={{
        classes: {
          input: classesMUI.input,
        },
        inputComponent: NumberFormatCustom,
      }}
      InputLabelProps={{
        className: classesMUI.label,
      }}
      FormHelperTextProps={{
        className: classesMUI.helperText,
      }}
      variant="outlined"
      color={secondary && 'secondary'}
      value={values[name] || fieldprops.value}
      label={label}
      required={required}
      helperText={errorText}
      error={!!errorText}
      onChange={handleChange}
    />
  );
};

MyMaskedTextFieldCurrency.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default MyMaskedTextFieldCurrency;
