import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useField } from 'formik';
import classModule from './fkmui-select-states.module.css';
import { STATES } from './constants';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: (customStyle) => (customStyle.width || 20) + '%',
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
    fontWeight: '400',
    lineHeight: '1.66',
    letterSpacing: '0.03333em',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
    menuItem: {
      fontSize: '1.4rem',
    },
  },
}));

const MySelectStates = ({ label, required, customStyle, name }) => {
  const classesMUI = useStyles(customStyle);
  const [fieldprops, meta] = useField(name);
  const errorText = meta.error && meta.touched && meta.error;

  return (
    <React.Fragment>
      <FormControl
        className={
          meta.error && meta.touched
            ? `${classesMUI.formControl} ${classModule.Shake}`
            : classesMUI.formControl
        }
        variant="outlined"
        required={required}
        error={!!errorText}
      >
        <InputLabel className={classesMUI.label}>{label}</InputLabel>
        <Select {...fieldprops} label="State" className={classesMUI.select}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {STATES.map((item) => {
            return (
              <MenuItem
                classes={{
                  root: classesMUI.menuItem,
                }}
                key={item}
                value={item}
              >
                {item}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText className={classesMUI.errorMessage}>{errorText}</FormHelperText>
      </FormControl>
    </React.Fragment>
  );
};

MySelectStates.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default MySelectStates;
