import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
// CSS
import classModule from './fkmui-textfield-masked.module.css';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { FormHelperText } from '@material-ui/core';
// TextMask
import MaskedInput from 'react-text-mask';

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

export const MyMaskedTextField = ({
  label,
  required,
  maskInput,
  delimiter,
  secondary,
  customStyle,
  name,
}) => {
  const classesMUI = useStyles(customStyle);
  const [fieldprops, meta, handler] = useField(name);
  const errorText = meta.error && meta.touched && meta.error;

  const TextMaskCustom = useCallback(
    (props) => {
      const { inputRef, ...other } = props;

      return (
        <MaskedInput
          {...other}
          ref={(ref) => {
            inputRef(ref ? ref.inputElement : null);
          }}
          mask={maskInput}
          placeholderChar={'\u2000'}
          keepCharPositions={false}
          // showMask
        />
      );
    },
    [maskInput]
  );

  return (
    <React.Fragment>
      <FormControl
        className={
          meta.error && meta.touched
            ? `${classesMUI.textField} ${classModule.Shake}`
            : classesMUI.textField
        }
        variant="outlined"
        required={required}
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
          label={label}
          error={!!errorText}
          inputComponent={TextMaskCustom}
          inputProps={{ className: classesMUI.input }}
          color={secondary && 'secondary'}
          onChange={(e) => {
            const delimiterRegExp = new RegExp(delimiter, 'g');
            const val = e.target.value.replace(delimiterRegExp, '');
            handler.setValue(val);
          }}
        />
      </FormControl>
      <FormHelperText className={classesMUI.errorMessage}>{errorText}</FormHelperText>
    </React.Fragment>
  );
};

MyMaskedTextField.propTypes = {
  label: PropTypes.string.isRequired,
  maskInput: PropTypes.array.isRequired,
  delimiter: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default MyMaskedTextField;
