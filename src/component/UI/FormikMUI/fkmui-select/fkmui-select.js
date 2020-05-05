import React from 'react';
import PropTypes from 'prop-types';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

import { useField } from 'formik';
import classModule from './fkmui-select.module.css';

const useStyles = makeStyles({
  formControl: {
    width: (customStyle) => customStyle.width || null,
    textAlign: 'left',
    fontWeight: '600',
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
  MenuInput: {
    textAlign: 'left',
  },
});

const MySelect = ({ options, label, required, ...props }) => {
  const { customStyle } = props;
  const classes = useStyles(customStyle);
  const [fieldprops, meta] = useField(props);
  const errorText = meta.error && meta.touched && meta.error;


  return (
    <React.Fragment>
      <FormControl
        className={
          meta.error && meta.touched
            ? `${classes.formControl} ${classModule.Shake}`
            : classes.formControl
        }
        variant="outlined"
        required={required}
        error={!!errorText}
      >
        <InputLabel>{label}</InputLabel>
        <Select {...fieldprops} label={label}>
          {options.map((item) => {
            return (
              <MenuItem key={item.id} value={item.value}>
                {item.value}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{errorText}</FormHelperText>
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
