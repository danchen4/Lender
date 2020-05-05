import React, { useState, useEffect } from 'react';

import { Button, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../theme';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import SaveIcon from '@material-ui/icons/Save';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import MyTextField from '../UI/FormikMUI/fkmui-textfield-outline/fkmui-textfield-outline';
import MySelectStates from '../UI/FormikMUI/fkmui-select-states/fkmui-select-states';
import MySelect from '../UI/FormikMUI/fkmui-select/fkmui-select';
import MyCalender from '../UI/FormikMUI/fkmui-calender/fkmui-calender';

  // #region
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
  },
  paper: {
    width: '500px',
    margin: 'auto',
    borderRadius: '6px',
    padding: theme.spacing(5),
  },
  spacer: {
    margin: '24px 0',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    margin: '1rem',
    backgroundColor: customTheme.palette.primary.dark,
  },
  button2: {
    width: '35%',
    fontSize: '14px',
    backgroundColor: customTheme.palette.primary.dark,
  },
  textbutton1: {
    color: customTheme.palette.text.secondary,
    margin: '0 1rem',
    fontSize: '14px',
  },
  textbutton2: {
    color: customTheme.palette.error.light,
    margin: '0 1rem',
    fontSize: '14px',
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
  }
}));

const payFrequencySelect = [
  { id: 'weekly', value: 'Weekly' },
  { id: 'biweekly', value: 'Bi-Weekly' },
  { id: 'semimonthly', value: 'Semi-Monthly' },
  { id: 'monthly', value: 'Monthly' },
];

const weeklyPayDateSelect = [
  { id: 'monday', value: 'Monday' },
  { id: 'tuesday', value: 'Tuesday' },
  { id: 'wednesday', value: 'Wednesday' },
  { id: 'thursday', value: 'Thursday' },
  { id: 'friday', value: 'Friday' },
];

const semiMonthlyDate1Select = [...Array(15).keys()].map((item) => ({ id: item++, value: item++ }));
const semiMonthlyDate2Select = [...Array(16).keys()].map((item) => ({
  id: item++ + 15,
  value: item++ + 15,
}));
const monthlyDateSelect = [...Array(31).keys()].map((item) => ({ id: item++, value: item++ }));

const otherIncomeSelect = [
  { id: 'ss', value: 'Social Security' },
  { id: 'pension', value: 'Pension' },
  { id: 'disability', value: 'Disability' },
  { id: 'other', value: 'Other' },
]

const WeeklyPayFrequency = (props) => {
  return (
    <React.Fragment>
      <MySelect
        name="weeklyPayDate"
        label="Day of Week"
        options={weeklyPayDateSelect}
        required
        customStyle={{ width: '100%' }}
      />
    </React.Fragment>
  );
};

const BiweeklyPayFrequency = (props) => {
  return (
    <React.Fragment>
      <MyCalender
        name="nextPayDate"
        label="Next Pay Date"
        required
        customStyle={{ width: '100%' }}
      />
    </React.Fragment>
  );
};

const SemiMonthlyPayFrequency = (props) => {
  const classes = useStyles();

  return (
    <div className={`${classes.spacer} ${classes.flex}`}>
      <MySelect
        name="semiMonthlyDate1"
        label="1st Pay Date"
        options={semiMonthlyDate1Select}
        required
        customStyle={{ width: '45%' }}
      />
      <MySelect
        name="semiMonthlyDate2"
        label="2nd Pay Date"
        options={semiMonthlyDate2Select}
        required
        customStyle={{ width: '45%' }}
      />
    </div>
  );
};

const MonthlyPayFrequency = (props) => {
  return (
    <React.Fragment>
      <MySelect
        name="monthlyPayDate"
        label="Day of Month"
        options={monthlyDateSelect}
        required
        customStyle={{ width: '100%' }}
      />
    </React.Fragment>
  );
};

const AddEmployerIncomeForm = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.spacer}>
        <MyTextField name="employerName" label="Employer Name" required customStyle={{ width: '100%' }} />
      </div>

      <div className={classes.spacer}>
        <MyTextField
          name="address1"
          label="Employer Address 1"
          required
          customStyle={{ width: '100%' }}
        />
      </div>

      <div className={classes.spacer}>
        <MyTextField name="address2" label="Employer Address 2" customStyle={{ width: '100%' }} />
      </div>

      <div className={`${classes.spacer} ${classes.flex}`}>
        <MyTextField name="city" label="City" required customStyle={{ width: '50%' }} />
        <MySelectStates name="state" label="State" required customStyle={{ width: '20%' }} />
        <MyTextField name="zip" label="ZIP Code" required customStyle={{ width: '25%' }} />
      </div>

      <h4>Employment Income Information</h4>
      <div className={`${classes.spacer} ${classes.flex}`}>
        <MySelect
          name="payFrequency"
          label="Pay Frequency"
          options={payFrequencySelect}
          required
          customStyle={{ width: '45%' }}
        />
        <MyTextField
          name="grossIncome"
          label="Gross Income Per Period"
          required
          customStyle={{ width: '45%' }}
        />
      </div>

      {props.values.payFrequency === 'Weekly' ? <WeeklyPayFrequency {...props} /> : null}
      {props.values.payFrequency === 'Bi-Weekly' ? <BiweeklyPayFrequency {...props}/> : null}
      {props.values.payFrequency === 'Semi-Monthly' ? <SemiMonthlyPayFrequency {...props}/> : null}
      {props.values.payFrequency === 'Monthly' ? <MonthlyPayFrequency {...props} /> : null}
    </React.Fragment>
  );
};

const AddOtherIncomeForm = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h4>Other Income Information</h4>
      

      
      <MySelect
          name="otherIncomeName"
          label="Other Income Type"
          options={otherIncomeSelect}
          required
          customStyle={{ width: '100%' }}
        />

      <div className={`${classes.spacer} ${classes.flex}`}>
        <MySelect
          name="payFrequency"
          label="Pay Frequency"
          options={payFrequencySelect}
          required
          customStyle={{ width: '45%' }}
        />
        <MyTextField
          name="grossIncome"
          label="Gross Income Per Period"
          required
          customStyle={{ width: '45%' }}
        />
      </div>

      {props.values.payFrequency === 'Weekly' ? <WeeklyPayFrequency {...props}/> : null}
      {props.values.payFrequency === 'Bi-Weekly' ? <BiweeklyPayFrequency {...props}/> : null}
      {props.values.payFrequency === 'Semi-Monthly' ? <SemiMonthlyPayFrequency {...props}/> : null}
      {props.values.payFrequency === 'Monthly' ? <MonthlyPayFrequency {...props}/> : null}
    </React.Fragment>
  );
};

const SelectIncomeSource = (props) => {
  const { customStyle } = props;
  const classes = useStyles(customStyle);

  // console.log('SelectIncomeSource',props);

  return(
    <FormControl variant="outlined" className={classes.select}>
    <InputLabel>Source of Income</InputLabel>
    <Select
      name="incomeSource"
      value={props.values.incomeSource}
      onChange={(event) => {
        props.setIncomeType(event.target.value);
        props.setFieldValue('incomeSource', event.target.value)
        // console.log(props.values);
      }}
      label="Source of Income"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value='Employment'>Employment</MenuItem>
      <MenuItem value='Other'>Other (Retirement / Pension)</MenuItem>
    </Select>
  </FormControl>

  );
}

const setIncomeDataObject = (values) => {
  const employerDataCopy = {
    employerName: values.employerName,
    address1: values.address1,
    address2: values.address2,
    city: values.city,
    state: values.state,
    zip: values.zip,
    phone: values.phone,
  }

  const incomeDataCopy = {
    grossIncome: values.grossIncome,
    payFrequency: values.payFrequency,
    nextPayDate: values.nextPayDate,
    weeklyPayDate: values.weeklyPayDate,
    monthlyPayDate: values.monthlyPayDate,
    semiMonthlyDate1: values.semiMonthlyDate1,
    semiMonthlyDate2: values.semiMonthlyDate2,
  }

  return {
    edit: false,
    source: values.incomeSource,
    otherIncomeName: values.otherIncomeName,
    employerData: employerDataCopy,
    incomeData: incomeDataCopy,
  }

}

const validationSchema = Yup.object({
  incomeSource: Yup.string().required(),
  employerName: Yup.string().when('incomeSource', {
    is: 'Employment',
    then: Yup.string().required(),
    otherwise: Yup.string(),
  }),
  address1: Yup.string().when('incomeSource', {
    is: 'Employment',
    then: Yup.string().max(30).required(),
    otherwise: Yup.string(),
  }),
  address2: Yup.string().max(30),
  city: Yup.string().when('incomeSource', {
    is: 'Employment',
    then: Yup.string().required(),
    otherwise: Yup.string(),
  }),
  state: Yup.string().when('incomeSource', {
    is: 'Employment',
    then: Yup.string().required(),
    otherwise: Yup.string(),
  }),
  zip: Yup.number().when('incomeSource', {
    is: 'Employment',
    then: Yup.number('Zip code must be a number').required(),
    otherwise: Yup.number(),
  }),
  otherIncomeName: Yup.string().when('incomeSource', {
    is: 'Other',
    then: Yup.string().required(),
    otherwise: Yup.string(),
  }),
  payFrequency: Yup.string().required(),
  grossIncome: Yup.number().min(1).max(99999).required(),
  nextPayDate: Yup.date().when('payFrequency', {
    is: 'Bi-Weekly',
    then: Yup.date().required(),
    otherwise: Yup.date(),
  }),
  weeklyPayDate: Yup.string().when('payFrequency', {
    is: 'Weekly',
    then: Yup.string().required(),
    otherwise: Yup.string(),
  }),
  monthlyPayDate: Yup.number().when('payFrequency', {
    is: 'Monthly',
    then: Yup.number().required(),
    otherwise: Yup.number(),
  }),
  semiMonthlyDate1: Yup.number().when('payFrequency', {
    is: 'Semi-Monthly',
    then: Yup.number().required(),
    otherwise: Yup.number(),
  }),
  semiMonthlyDate2: Yup.number().when('payFrequency', {
    is: 'Semi-Monthly',
    then: Yup.number().required(),
    otherwise: Yup.number(),
  }),
});


const AddIncomeSourceForm  = props => {
  const classes = useStyles();
  const {showForm, addIncomeData , toggleForm} = props;

  const [incomeType, setIncomeType] = useState('');

  let initialValues = {
    incomeSource: '',
    employerName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    otherIncomeName: '',
    grossIncome: '',
    payFrequency: '',
    nextPayDate: '',
    weeklyPayDate: '',
    monthlyPayDate: '',
    semiMonthlyDate1: '',
    semiMonthlyDate2: '',
  }; 

  const submitHandler = async (values, actions) => {
      actions.setSubmitting(true);
      const incomeInputValues = setIncomeDataObject(values);
      await addIncomeData(incomeInputValues); //need  await or else toggleForm() will unmount before state is updated
      actions.setSubmitting(false);
      actions.resetForm();
      toggleForm();
    
    // setTimeout(()=>toggleForm(),100)
  };
  
  let form = '';
  if (showForm) {
    form = (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions)=>{     
        submitHandler(values, actions);
      }}
    >
        {(props) => (
          <Form>
            <div className={classes.spacer}>
                <SelectIncomeSource {...props} setIncomeType={setIncomeType} customStyle={{ width: '100%' }}/>
            </div>

            {incomeType === 'Employment' && <AddEmployerIncomeForm {...props} />}
            {incomeType === 'Other' && <AddOtherIncomeForm {...props} />}

            <div className={classes.spacer}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
                onClick={(event) => {
                  setIncomeType('');
                  props.setFieldValue('incomeSource', '')
                  toggleForm();
                  // console.log(props.values);
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                type="submit"
                startIcon={<SaveIcon />}
                disabled={!props.dirty || !props.isValid || props.isSubmitting}
              >
              Save
              </Button>
            </div>

            <pre className={classes.valueDisplay}>
              {JSON.stringify(props.values, null, 4)}
            </pre>
            <pre className={classes.valueDisplay}>
              {JSON.stringify(props.errors, null, 4)}
            </pre>
          </Form>
        )}         
    </Formik>
    );
  }

  return (
    <React.Fragment>
      {form}
    </React.Fragment>
  );

}

const EditIncomeSourceForm  = props => {
  const classes = useStyles();
  const { updateIncomeData , values, index} = props;

  const [showForm , setShowForm ] = useState(true);

  const initialValues = {
      incomeSource: values[index].source,
      employerName: values[index].employerData.employerName,
      address1: values[index].employerData.address1,
      address2: values[index].employerData.address2,
      city: values[index].employerData.city,
      state: values[index].employerData.state,
      zip: values[index].employerData.zip,
      otherIncomeName: values[index].otherIncomeName,
      grossIncome: values[index].incomeData.grossIncome,
      payFrequency: values[index].incomeData.payFrequency,
      nextPayDate: values[index].incomeData.nextPayDate,
      weeklyPayDate: values[index].incomeData.weeklyPayDate,
      monthlyPayDate: values[index].incomeData.monthlyPayDate,
      semiMonthlyDate1: values[index].incomeData.semiMonthlyDate1,
      semiMonthlyDate2: values[index].incomeData.semiMonthlyDate2,
    }; 

  const hideForm = () => {
    setShowForm(false);
  }

  const submitHandler = async (values, actions) => {
      actions.setSubmitting(true);
      const incomeInputValues = setIncomeDataObject(values);
      await updateIncomeData(incomeInputValues); //need  await or else toggleForm() will unmount before state is updated
      actions.setSubmitting(false);
      actions.resetForm();
      hideForm();
    
    // setTimeout(()=>toggleForm(),100)
  };

  
  let form = '';
  if (showForm) {
    form = (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions)=>{     
        submitHandler(values, actions);
      }}
    >
        {(props) => (
          <Form>

            {values[index].source === 'Employment' && <AddEmployerIncomeForm {...props} />}
            {values[index].source === 'Other' && <AddOtherIncomeForm {...props} />}

            <div className={classes.spacer}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
                onClick={(event) => {
                  props.setFieldValue('incomeSource', '')
                  hideForm();
                  // console.log(props.values);
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                type="submit"
                startIcon={<SaveIcon />}
                disabled={!props.dirty || !props.isValid || props.isSubmitting}
              >
              Save
              </Button>
            </div>

            <pre className={classes.valueDisplay}>
              {JSON.stringify(props.values, null, 4)}
            </pre>
            <pre className={classes.valueDisplay}>
              {JSON.stringify(props.errors, null, 4)}
            </pre>
          </Form>
        )}         
    </Formik>
    );
  }

  return (
    <React.Fragment>
      {form}
    </React.Fragment>
  );

}


// #endregion

const FormEmployer = React.memo((props) => {
  const classes = useStyles();
  const { incomeArray, addIncomeData , deleteIncomeData, editIncomeData, updateIncomeData } = props;
  const [showForm, setShowForm] = useState(false);
  const [disableNext, setDisableNext] = useState(true);

  console.log('<FormEmployer /> RENDER', incomeArray);

  const nextStep = () => {
    props.history.push({ pathname: '/confirm' });
  };

  const prevStep = () => {
    props.history.push({ pathname: '/personalinfo' });
  };

  const toggleFormHandler = () => {
    setShowForm(!showForm);
  }

  useEffect(()=>{
    if (incomeArray.length > 0 ) {
      setDisableNext(false);
    }
  },[incomeArray])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={2}>
        <div className={classes.spacer}>
          <Typography variant="h4" color="secondary">
            Source of Income
          </Typography>
        </div>

        {incomeArray.map((incomeSource, index) => {
          return (
            <div className={classes.spacer} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {incomeSource.source} Income: {incomeSource.employerData.employerName || incomeSource.otherIncomeName}
                  </Typography>
                  <Typography variant="body2">
                    <b>Gross Income:</b> {incomeSource.incomeData.grossIncome}, <b>Pay Frequency:</b> {incomeSource.incomeData.payFrequency}
                  </Typography>
                  {incomeSource.edit && <EditIncomeSourceForm
                      updateIncomeData={updateIncomeData}
                      values={incomeArray}
                      index={index}
                    />}
                </CardContent>
                <div className={classes.flex}>
                <CardActions>
                  <Button 
                      className={classes.textbutton1}
                      size="small"
                      color="primary-light"
                      onClick={()=>editIncomeData(index)}
                    >Edit</Button>
                  </CardActions>
                  <CardActions>
                    <Button 
                      className={classes.textbutton2}
                      size="small"
                      onClick={()=>deleteIncomeData(index)}
                    >Delete</Button>
                  </CardActions>
                  </div>
                
              </Card>
              
            </div>
          );
        })}

        <div className={classes.spacer}>
        <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button2}
            disabled={showForm}
            onClick={toggleFormHandler}
          >
            Add Source
          </Button>
        </div>  

        {showForm && <AddIncomeSourceForm 
          showForm={showForm}
          addIncomeData={addIncomeData}
          toggleForm={toggleFormHandler}
        />}
      

        <div className={classes.spacer}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button}
            onClick={prevStep}
          >
            Back
          </Button>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            type="submit"
            disabled={disableNext}
            onClick={nextStep}
          >
            Next Step
          </Button>
        </div>
    </Paper>  
      
    </div>
  );
});

export default FormEmployer;
