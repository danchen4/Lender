import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
// Formik
import { useField } from 'formik';
// CSS
import './shake.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: (customStyle) => (customStyle.width || 100) + '%',
    textAlign: 'left',
    fontWeight: '600',
  },
  label: {
    fontSize: (customStyle) => (customStyle.fontSize || 1.6) + 'rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: (customStyle) => (parseInt(customStyle.fontSize * 0.7) || 1.2) + 'rem',
    },
  },
  select: {
    fontSize: (customStyle) => (customStyle.fontSize || 1.6) + 'rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: (customStyle) => (parseInt(customStyle.fontSize * 0.7) || 1.2) + 'rem',
    },
  },
  errorMessage: {
    color: 'rgba(164, 49, 41, 1)',
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
  menuItem: {
    fontSize: (customStyle) => (customStyle.fontSize || 1.6) + 'rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: (customStyle) => (parseInt(customStyle.fontSize * 0.7) || 1.2) + 'rem',
    },
  },
  MenuInput: {
    textAlign: 'left',
  },
}));

export const MySelect = ({ options, label, required, customStyle, name }) => {
  const classesMUI = useStyles(customStyle);
  const [fieldprops, meta] = useField(name);
  const errorText = meta.error && meta.touched && meta.error;

  return (
    <React.Fragment>
      <FormControl
        className={
          meta.error && meta.touched ? `${classesMUI.formControl} Shake` : classesMUI.formControl
        }
        variant="outlined"
        required={required}
        error={!!errorText}
      >
        <InputLabel className={classesMUI.label}>{label}</InputLabel>
        <Select {...fieldprops} label={label} className={classesMUI.select}>
          {options.map((item) => {
            return (
              <MenuItem
                classes={{
                  root: classesMUI.menuItem,
                }}
                key={item.id}
                value={item.value}
              >
                {item.value}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText className={classesMUI.errorMessage}>{errorText}</FormHelperText>
      </FormControl>
    </React.Fragment>
  );
};

MySelect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool,
};

export default MySelect;
