import React, { useState, useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actionApp from '../../../store/actions/index';
// MaterialUI
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftOutlinedIcon from '@material-ui/icons/KeyboardArrowLeftOutlined';
// Components
import { EditIncomeSourceForm } from './Forms/EditIncomeSourceForm';
import { AddIncomeSourceForm } from './Forms/AddIncomeSourceForm';
import { Spacer, ScCard, ScHeader, ScFlexBox, ScTextBox, ScButton } from '../../UI/Styled';
// CSS
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classModule from './Income.module.css';
// Misc.
import { CARD_FORMAT_2 } from '../../../constants';
import { IncomeSource } from './components/IncomeSource';
import { ProgressBar } from '../../ProgressBar/ProgressBar';

const FormEmployer = ({ pathNext, pathPrev, history }) => {
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

  return (
    <>
      <ProgressBar />
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
                  <ScCard {...CARD_FORMAT_2(incomeSource)}>
                    <IncomeSource incomeSource={incomeSource} index={index} />
                    <Spacer mBot={0.1}>
                      {incomeSource.edit && (
                        <EditIncomeSourceForm
                          updateIncomeData={onUdpateIncomeArray}
                          values={incomeDataREDUX}
                          index={index}
                          editIncomeData={onEditIncomeArray}
                        />
                      )}
                      {!incomeSource.edit && (
                        <ScFlexBox justify="space-evenly">
                          <ScButton
                            variant="outlined"
                            variantColor="error"
                            padding="0.5rem"
                            width="30%"
                            onClick={(index) => onDeleteIncomeArray(index)}
                          >
                            Delete
                          </ScButton>
                          <ScButton
                            variant="outlined"
                            variantColor="grey1"
                            padding="0.5rem"
                            width="30%"
                            onClick={() => onEditIncomeArray(index, true)}
                          >
                            Edit
                          </ScButton>
                        </ScFlexBox>
                      )}
                    </Spacer>
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
          <ScFlexBox justify="space-between">
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
              Next
              <KeyboardArrowRightIcon />
            </ScButton>
          </ScFlexBox>
        </Spacer>
      </ScCard>
    </>
  );
};

export default FormEmployer;
