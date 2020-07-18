import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: (customStyle) => (customStyle.width || 100) + '%',
    textAlign: 'left',
  },
  label: {
    fontSize: (customStyle) => (customStyle.fontSize || 1.6) + 'rem',
  },
  select: {
    fontSize: (customStyle) => (customStyle.fontSize || 1.6) + 'rem',
  },
  menuItem: {
    fontSize: (customStyle) => (customStyle.fontSize || 1.6) + 'rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: (customStyle) => (parseInt(customStyle.fontSize * 0.7) || 1.2) + 'rem',
    },
  },
}));

export const SelectIncomeSource = ({ values, customStyle, setIncomeType, setFieldValue }) => {
  const classesMUI = useStyles(customStyle);

  return (
    <FormControl variant="outlined" className={classesMUI.formControl}>
      <InputLabel className={classesMUI.label}>Source of Income</InputLabel>
      <Select
        className={classesMUI.select}
        name="incomeSource"
        label="Source of Income"
        value={values.incomeSource}
        onChange={(event) => {
          setIncomeType(event.target.value);
          setFieldValue('incomeSource', event.target.value);
        }}
      >
        <MenuItem
          classes={{
            root: classesMUI.menuItem,
          }}
          value=""
        >
          <em>None</em>
        </MenuItem>
        <MenuItem
          classes={{
            root: classesMUI.menuItem,
          }}
          value="Employment"
        >
          Employment
        </MenuItem>
        <MenuItem
          classes={{
            root: classesMUI.menuItem,
          }}
          value="Other"
        >
          Other (Retirement / Pension)
        </MenuItem>
      </Select>
    </FormControl>
  );
};
