import 'date-fns';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { useField } from 'formik';
import { makeStyles } from '@material-ui/core/styles';

import classModule from './fkmui-calender.module.css';
import { FormHelperText, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  datePicker: {
    width: (customStyle) => (customStyle.width || 20) + '%',
    fontSize: (customStyle) => (customStyle.fontSize || 1.6) + 'rem',
    textAlign: 'left',
    fontWeight: '600',
  },
  label: {
    fontSize: (customStyle) => (customStyle.fontSize || 1.6) + 'rem',
    marginBottom: '2rem',
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
  errorMessage: {
    color: 'rgba(164, 49, 41, 1)',
    margin: '3px 14px 0 14px',
    fontSize: '1.4rem',
    textAlign: 'left',
    fontWeight: 'normal',
    lineHeight: '1.66',
    letterSpacing: '0.03333em',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  },
}));

const MyCalender = ({ label, required, customStyle, name }) => {
  const classesMUI = useStyles(customStyle);
  const [fieldprops, meta, handler] = useField(name);
  const errorText = meta.error && meta.touched && meta.error;
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            {...fieldprops}
            className={
              meta.error && meta.touched
                ? `${classesMUI.datePicker} ${classModule.Shake}`
                : classesMUI.datePicker
            }
            error={!!errorText}
            value={selectedDate}
            autoOk
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            label={label}
            required={required}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            InputProps={{
              classes: {
                input: classesMUI.input,
              },
            }}
            InputLabelProps={{
              className: classesMUI.label,
            }}
            onChange={(date) => {
              handleDateChange(date);
              handler.setValue(selectedDate);
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <FormHelperText className={classesMUI.errorMessage}>{errorText}</FormHelperText>
    </>
  );
};

export default MyCalender;
