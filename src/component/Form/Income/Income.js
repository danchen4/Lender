import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionApp from '../../../store/actions/index';

import { Button, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../../theme';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import EditIncomeSourceForm from './Forms/EditIncomeSourceForm';
import AddIncomeSourceForm from './Forms/AddIncomeSourceForm';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classModule from './Income.module.css';

import useTraceUpdate from '../../../hooks/trace-update';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
  },

  box: {
    padding: '0.5rem',
  },
  paper: {
    maxWidth: '600px',
    margin: 'auto',
    borderRadius: '6px',
    padding: theme.spacing(3),
  },
  card: {
    boxShadow: '0 5px 10px -3px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '0 auto',
  },
  cardContent: {
    padding: '0',
  },
  editIncome: {
    padding: '1rem',
  },
  spacer: {
    padding: '24px 0',
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
  },
}));

const FormEmployer = React.memo((props) => {
  console.log('<FormIncome /> RENDER');
  console.log('<FormIncome />  match', props.match);
  useTraceUpdate(props);

  const classes = useStyles();
  const { pathNext, pathPrev, history } = props;
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();
  const incomeDataREDUX = useSelector((state) => state.application.incomeData);
  const onAddIncomeArray = (incomeDataObject) =>
    dispatch(actionApp.addIncomeArray(incomeDataObject));
  const onDeleteIncomeArray = (index) => dispatch(actionApp.deleteIncomeArray(index));
  const onUdpateIncomeArray = (incomeDataObject, index) =>
    dispatch(actionApp.udpateIncomeArray(incomeDataObject, index));
  const onEditIncomeArray = (index, editable) =>
    dispatch(actionApp.editIncomeArray(index, editable));

  const nextStep = () => {
    console.log('<FormIncome /> next step');
    history.push({ pathname: pathNext });
  };

  const prevStep = () => {
    history.push({ pathname: pathPrev });
  };

  const toggleFormHandler = () => {
    setShowForm(!showForm);
  };

  return (
    <div className={classes.root}>
      <Box component="div" className={classes.box}>
        <Paper className={classes.paper} elevation={2}>
          <div className={classes.spacer}>
            <Typography variant="h4" color="secondary">
              Source of Income
            </Typography>
          </div>

          <TransitionGroup>
            {incomeDataREDUX.map((incomeSource, index) => {
              return (
                <CSSTransition
                  key={index}
                  timeout={200}
                  classNames={{
                    enter: classModule.fadeEnter,
                    enterActive: classModule.fadeEnterActive,
                    exitActive: classModule.fadeExit,
                    exit: classModule.fadeExitActive,
                  }}
                >
                  <div className={classes.spacer}>
                    <Card variant="outlined" className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <div className={classModule.CardHeader}>
                          <Typography variant="h6">
                            Income Source:{' '}
                            <span className={classModule.Darken}>
                              {incomeSource.employerData.employerName.value ||
                                incomeSource.otherIncomeName.value}
                            </span>
                          </Typography>
                        </div>
                        <div className={classModule.CardBody}>
                          <div className={classModule.CardSection}>
                            <div className={classModule.CardSectionHeader}>Gross Income:</div>
                            <div>{incomeSource.incomeData.grossIncome.value}</div>
                          </div>
                          <div className={classModule.CardSection}>
                            <div className={classModule.CardSectionHeader}>Pay Frequency:</div>
                            <div>{incomeSource.incomeData.payFrequency.value}</div>
                          </div>
                        </div>

                        {incomeSource.edit && (
                          <EditIncomeSourceForm
                            className={classes.editIncome}
                            updateIncomeData={onUdpateIncomeArray}
                            values={incomeDataREDUX}
                            index={index}
                            editIncomeData={onEditIncomeArray}
                          />
                        )}
                      </CardContent>
                      <div className={classes.flex}>
                        <CardActions className={classes.cardActions}>
                          <Button
                            className={classes.textbutton1}
                            size="small"
                            color="primary"
                            onClick={() => onEditIncomeArray(index, true)}
                          >
                            Edit
                          </Button>
                        </CardActions>
                        <CardActions className={classes.cardActions}>
                          <Button
                            className={classes.textbutton2}
                            size="small"
                            onClick={() => onDeleteIncomeArray(index)}
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </div>
                    </Card>
                  </div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>

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

          {showForm && (
            <AddIncomeSourceForm
              showForm={showForm}
              addIncomeData={onAddIncomeArray}
              toggleForm={toggleFormHandler}
            />
          )}

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
              disabled={incomeDataREDUX.length === 0}
              onClick={nextStep}
            >
              Next Step
            </Button>
          </div>
        </Paper>
      </Box>
    </div>
  );
});

export default FormEmployer;
