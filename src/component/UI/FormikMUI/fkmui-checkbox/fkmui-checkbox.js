import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
// Formik
import { useField } from 'formik';
// CSS
import classModule from './fkmui-checkbox.module.css';

const useStyles = makeStyles((theme) => ({
  formSelect: {
    width: (customStyle) => (customStyle.width || 100) + '%',
    textAlign: 'left',
    fontWeight: '600',
  },
  labelRoot: {
    alignItems: 'flex-start',
  },
  label: {
    fontSize: (customStyle) => (customStyle.fontSize || 1.6) + 'rem',
    padding: '4px 9px',
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
  MenuInput: {
    textAlign: 'left',
  },
}));

export const MyCheckBox = ({ label, required, customStyle, name }) => {
  const classesMUI = useStyles(customStyle);
  const [fieldprops, meta] = useField(name);
  const errorText = meta.error && meta.touched && meta.error;

  return (
    <React.Fragment>
      <FormControl
        className={
          meta.error && meta.touched
            ? `${classesMUI.formSelect} ${classModule.Shake}`
            : classesMUI.formSelect
        }
        required={required}
        error={!!errorText}
      >
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox {...fieldprops} size="medium" />}
            label={label}
            classes={{ root: classesMUI.labelRoot, label: classesMUI.label }}
          />
        </FormGroup>
        <FormHelperText className={classesMUI.errorMessage}>{errorText}</FormHelperText>
      </FormControl>
    </React.Fragment>
  );
};

MyCheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default MyCheckBox;
