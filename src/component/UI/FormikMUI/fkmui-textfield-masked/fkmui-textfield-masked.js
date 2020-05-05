import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classModule from './fkmui-textfield-masked.module.css';

import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
// import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { useField, ErrorMessage } from 'formik';
import MaskedInput from 'react-text-mask';

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

const MyMaskedTextField = ({ label, required, maskInput, delimiter, ...props }) => {
  const { customStyle } = props;
  const classes = useStyles(customStyle);
  const [fieldprops, meta, handler] = useField(props);

  const errorText = meta.error && meta.touched && meta.error;

  const TextMaskCustom = useCallback(
    (props) => {
      const { inputRef, ...other } = props;

      return (
        <MaskedInput
          {...other}
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
            ? `${classes.textField} ${classModule.Shake}`
            : classes.textField
        }
        variant="outlined"
        required={required}
      >
        <InputLabel>{label}</InputLabel>
        <OutlinedInput
          {...fieldprops}
          label={label}
          error={!!errorText}
          inputComponent={TextMaskCustom}
          onChange={(e) => {
            const delimiterRegExp = new RegExp(delimiter, 'g');
            const val = e.target.value.replace(delimiterRegExp, '');
            handler.setValue(val);
          }}
        />
      </FormControl>
      <ErrorMessage>{() => <div className={classes.errorMessage}>{errorText}</div>}</ErrorMessage>
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
