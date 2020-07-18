import React, { useState, useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actionApp from '../../../store/actions/index';
// MaterialUI
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftOutlinedIcon from '@material-ui/icons/KeyboardArrowLeftOutlined';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// Components
import { EditIncomeSourceForm } from './Forms/EditIncomeSourceForm';
import { AddIncomeSourceForm } from './Forms/AddIncomeSourceForm';
import { Spacer } from '../../UI/Styled/Spacer';
import { FlexBox } from '../../UI/CustomUI/Flexbox/Flexbox';
import { ScCard, ScHeader } from '../../UI/Styled';
import { ScTextBox } from '../../UI/Styled/ScTextBox';
import { ScButton } from '../../UI/Styled/ScButton';
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
    padding: theme.spacing(4),
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
    backgroundColor: theme.palette.primary.dark,
  },
  button2: {
    width: '35%',
    fontSize: '14px',
    backgroundColor: theme.palette.primary.dark,
  },
  textbutton1: {
    color: theme.palette.text.secondary,
    margin: '0 1rem',
    fontSize: '14px',
    padding: '1rem 4rem',
  },
  textbutton2: {
    color: theme.palette.error.light,
    margin: '0 1rem',
    fontSize: '14px',
    padding: '1rem 4rem',
  },
  valueDisplay: {
    marginTop: '40px',
    width: '500px',
    margin: 'auto',
    textAlign: 'left',
  },
}));

const FormEmployer = ({ pathNext, pathPrev, history }) => {
  const classes = useStyles();
  const [showForm, setShowForm] = useState(false);

  const incomeDataREDUX = useSelector((state) => state.application.incomeData);
  const dispatch = useDispatch();
  const onDeleteIncomeArray = (index) => dispatch(actionApp.deleteIncomeArray(index));
  const onUdpateIncomeArray = (incomeDataObject, index) =>
    dispatch(actionApp.udpateIncomeArray(incomeDataObject, index));
  const onEditIncomeArray = (index, editable) =>
    dispatch(actionApp.editIncomeArray(index, editable));

  useEffect(() => {
    const sessionIncomeData = sessionStorage.getItem('sessionIncomeData');
    // if income data is stored in session and Redux state is empty (when browser is refreshed)
    // then retrieve income data from session (which will be an array)
    // and set the Redux state to the array
    if (sessionIncomeData && !incomeDataREDUX.length) {
      const parsedData = JSON.parse(sessionIncomeData);
      dispatch(actionApp.setIncomeArray(parsedData));
    }
  }, []);

  const nextStep = () => {
    history.push({ pathname: pathNext });
  };

  const prevStep = () => {
    history.push({ pathname: pathPrev });
  };

  const toggleFormHandler = () => {
    setShowForm(!showForm);
  };

  console.log('incomeDataREDUX', incomeDataREDUX);

  return (
    <div className={classes.root}>
      <ScCard width={50} shadow="SmoothXs">
        <ScHeader as="h2" fontSize={3} fontWeight={500} color="secondary" mBot={1} mTop={2}>
          Source of Income
        </ScHeader>
        <ScTextBox>
          Help us understand your steady source of income so we can create a payment plan that’s
          right for you.
        </ScTextBox>
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
                  <ScCard width={50} shadow="none" bgColor="greyLight1">
                    <div>
                      <ScHeader
                        as="h5"
                        fontSize={1.6}
                        fontWeight={500}
                        color="secondary"
                        mBot={1}
                        mTop={1}
                      >
                        Income Source {index + 1}:
                        <span className={classModule.Darken}>
                          {incomeSource.employerData.employerName.value ||
                            incomeSource.otherIncomeName.value}
                        </span>
                      </ScHeader>
                    </div>
                    <div className={classModule.CardBody}>
                      <div className={classModule.CardSection}>
                        <div className={classModule.CardSectionHeader}>Gross Income:</div>
                        <div className={classModule.CardSectionData}>
                          {incomeSource.incomeData.grossIncome.value}
                        </div>
                      </div>
                      <div className={classModule.CardSection}>
                        <div className={classModule.CardSectionHeader}>Pay Frequency:</div>
                        <div className={classModule.CardSectionData}>
                          {incomeSource.incomeData.payFrequency.value}
                        </div>
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

                    <FlexBox justify="space-between">
                      <ScButton
                        variant="text"
                        variantColor="primary"
                        onClick={() => onEditIncomeArray(index, true)}
                      >
                        Edit
                      </ScButton>
                      <ScButton
                        variant="text"
                        variantColor="error"
                        onClick={(index) => onDeleteIncomeArray(index)}
                      >
                        Delete
                      </ScButton>
                    </FlexBox>
                  </ScCard>
                </Spacer>
              </CSSTransition>
            );
          })}
        </TransitionGroup>

        <Spacer>
          <ScButton variant="primary" disabled={showForm} onClick={toggleFormHandler}>
            Add Income Source
          </ScButton>
        </Spacer>

        {showForm && <AddIncomeSourceForm showForm={showForm} toggleForm={toggleFormHandler} />}

        <Spacer mTop={5}>
          <FlexBox justify="space-between">
            <ScButton variant="secondary" width="45%" onClick={prevStep}>
              <KeyboardArrowLeftOutlinedIcon />
              Back
            </ScButton>
            <ScButton
              variant="secondary"
              width="45%"
              type="submit"
              disabled={incomeDataREDUX.length === 0}
              onClick={nextStep}
            >
              Next Step
              <KeyboardArrowRightIcon />
            </ScButton>
          </FlexBox>
        </Spacer>
      </ScCard>
    </div>
  );
};

export default FormEmployer;
