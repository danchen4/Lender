import React from 'react';

import {
  Button,
  Typography,
  TextField,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../theme';

// import Input from '../UI/Input'

import { Formik, Form, Field, useField, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';

import MyTextField from '../UI/FormikMUI/fkmui-textfield-outline';

const useStyles = makeStyles({
  root: {
    marginTop: '30px',
  },
  textField: {
    maxWidth: '400px',
    width: '100%',
  },
  spacer: {
    margin: '24px 0',
  },
  button: {
    margin: '1rem',
    backgroundColor: customTheme.palette.primary.dark,
  },
  label: {
    marginLeft: '0.4em',
  },
});

const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyCheckbox = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel control={<Checkbox {...field} />} label={label} />;
};

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  termsAgree: false,
  cookies: [],
  pies: '',
  options: 1,
  pets: [
    { id: '' + Math.random(), type: 'cat', name: 'jarvis' },
    { id: '' + Math.random(), type: 'dog', name: 'barkey' },
  ],
};

const validationSchema = yup.object({
  firstName: yup.string().required().max(10).min(2),
  email: yup.string().email().required(),
  termsAgree: yup.boolean().oneOf([true]),
  cookies: yup.array(yup.string().oneOf(['chocolate chip', 'snicker', 'sugar'])).min(1),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required(),
    })
  ),
});

const FormUserName = (props) => {
  console.log('<FormUserName /> RENDER');
  const classes = useStyles();
  const { nextStep, prevStep } = props;

  return (
    <div className={classes.root}>
      <Typography variant="h4" color="secondary">
        User Information
      </Typography>
      <Formik
        initialValues={initialValues}
        // validate={(values) => {
        //   const errors = {};

        //   if (values.email.includes('bob')) {
        //     errors.email = 'no bob';
        //   }

        //   return errors;
        // }}
        validationSchema={validationSchema}
        onSubmit={(data, formikHelpers) => {
          formikHelpers.setSubmitting(true);
          nextStep();
          //make async call, loading, disable submit
          console.log(data);
          formikHelpers.setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
          <Form>
            <div className={classes.spacer}>
              <TextField
                name="firstName"
                label="First Name"
                type="input"
                variant="outlined"
                className={classes.textField}
                value={values.firstName}
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
            </div>

            <div className={classes.spacer}>
              <MyTextField name="firstName" label="First Name" type="input" />
            </div>

            <div className={classes.spacer}>
              <Field name="lastName" placeholder="Last Name" type="input" as={TextField} />
            </div>

            <div className={classes.spacer}>
              <MyTextField name="email" label="email" type="email" />
            </div>

            <div className={classes.spacer}>
              <MyCheckbox
                name="termsAgree"
                type="checkbox"
                label="Do you agree to the terms and conditions?"
              />
              <ErrorMessage name="termsAgree">
                You must agree to the terms and conditions
              </ErrorMessage>
            </div>

            <div className={classes.spacer}>
              <Field name="cookies" type="checkbox" value="chocolate chip" as={Checkbox} />
              <label>chocolate chip</label>
              <Field name="cookies" type="checkbox" value="snicker" as={Checkbox} />
              <label>snicker</label>
              <Field name="cookies" type="checkbox" value="sugar" as={Checkbox} />
              <label>sugar</label>
            </div>

            <div className={classes.spacer}>
              <MyRadio name="pies" type="radio" value="blueberry" label="blueberry" />
              <MyRadio name="pies" type="radio" value="apple" label="apple" />
              <MyRadio name="pies" type="radio" value="peach" label="peach" />
            </div>

            <div className={classes.spacer}>
              <FormControl>
                <Field name="options" type="select" as={TextField} select>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                </Field>
              </FormControl>
            </div>

            <div className={classes.spacer}>
              <FieldArray name="pets">
                {(arrayHelpers) => (
                  <div>
                    <Button
                      onClick={() => {
                        arrayHelpers.push({
                          type: 'frog',
                          name: '',
                          id: '' + Math.random(),
                        });
                      }}
                    >
                      Add Pet
                    </Button>
                    {values.pets.map((pet, index) => {
                      return (
                        <div className={classes.spacer} key={pet.id}>
                          <MyTextField name={`pets.${index}.name`} label="Pet Name" />
                          <Field name={`pets.${index}.type`} type="select" as={Select}>
                            <MenuItem value="cat">Cat</MenuItem>
                            <MenuItem value="dog">Dog</MenuItem>
                            <MenuItem value="frog">Frog</MenuItem>
                          </Field>
                          <Button
                            onClick={(index) => {
                              arrayHelpers.remove(index);
                            }}
                          >
                            X
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </FieldArray>
            </div>

            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              size="large"
              onClick={prevStep}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              type="submit"
              disabled={isSubmitting}
            >
              Next Step
            </Button>

            <pre
              style={{
                marginTop: '40px',
                width: '500px',
                margin: 'auto',
                textAlign: 'left',
              }}
            >
              {JSON.stringify(values, null, 4)}
            </pre>
            <pre
              style={{
                marginTop: '40px',
                width: '500px',
                margin: 'auto',
                textAlign: 'left',
              }}
            >
              {JSON.stringify(errors, null, 4)}
            </pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormUserName;
