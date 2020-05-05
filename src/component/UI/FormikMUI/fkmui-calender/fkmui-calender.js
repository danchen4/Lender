import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { useField } from 'formik';
import { makeStyles } from '@material-ui/core/styles';

import classModule from './fkmui-calender.module.css';

const useStyles = makeStyles({
  datePicker: {
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
});

const MyCalender = ({ label, required, ...props }) => {
  const { customStyle } = props;
  const classes = useStyles(customStyle);
  const [fieldprops, meta, handler] = useField(props);
  const errorText = meta.error && meta.touched && meta.error;

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
      c
        {...fieldprops}
        className={
          meta.error && meta.touched
            ? `${classes.datePicker} ${classModule.Shake}`
            : classes.datePicker
        }
        onChange={(date) => {
          handleDateChange(date);
          handler.setValue(selectedDate);
        }}
        clearable
        error={!!errorText}
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        label={label}
        required={required}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default MyCalender;
