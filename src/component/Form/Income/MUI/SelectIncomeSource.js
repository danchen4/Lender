import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  spacer: {
    margin: '24px 0',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  select: {
    width: (customStyle) => customStyle.width || null,
    textAlign: 'left',
  },
  valueDisplay: {
    marginTop: '40px',
    width: '500px',
    margin: 'auto',
    textAlign: 'left',
  },
}));

const SelectIncomeSource = (props) => {
  const { customStyle } = props;
  const classes = useStyles(customStyle);

  return (
    <FormControl variant="outlined" className={classes.select}>
      <InputLabel>Source of Income</InputLabel>
      <Select
        name="incomeSource"
        value={props.values.incomeSource}
        onChange={(event) => {
          props.setIncomeType(event.target.value);
          props.setFieldValue('incomeSource', event.target.value);
        }}
        label="Source of Income"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="Employment">Employment</MenuItem>
        <MenuItem value="Other">Other (Retirement / Pension)</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectIncomeSource;
