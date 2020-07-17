import React, { useState } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actionApp from '../../../store/actions/index';
// MaterialUI
import { Button, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../../theme/theme';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// Components
import EditIncomeSourceForm from './Forms/EditIncomeSourceForm';
import AddIncomeSourceForm from './Forms/AddIncomeSourceForm';
import { Spacer } from '../../UI/CustomUI/Spacer/Spacer';
import { FlexBox } from '../../UI/CustomUI/Flexbox/Flexbox';
// CSS
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classModule from './Income.module.css';

const useStyles = makeStyles((theme) => ({
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
  valueDisplay: {
    marginTop: '40px',
    width: '500px',
    margin: 'auto',
    textAlign: 'left',
  },
}));

const FormEmployer = React.memo(({ pathNext, pathPrev, history }) => {
  const classes = useStyles();
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
            <Spacer margin={3}>
              <Typography variant="h2" color="secondary">
                Source of Income
              </Typography>
            </Spacer>
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
                  <Spacer>
                    <Card variant="outlined" className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <div className={classModule.CardHeader}>
                          <Typography variant="h5">
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
                      <FlexBox justify="space-between">
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
                      </FlexBox>
                    </Card>
                  </Spacer>
                </CSSTransition>
              );
            })}
          </TransitionGroup>

          <Spacer>
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
          </Spacer>

          {showForm && (
            <AddIncomeSourceForm
              showForm={showForm}
              addIncomeData={onAddIncomeArray}
              toggleForm={toggleFormHandler}
            />
          )}

          <Spacer>
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
          </Spacer>
        </Paper>
      </Box>
    </div>
  );
});

export default FormEmployer;
