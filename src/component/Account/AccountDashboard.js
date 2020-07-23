import React, { useState, useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actionUserApp from '../../store/actions/index';
// Components
import { Spacer, ScFlexBox, ScCard, ScHeader, ScTextBox, ScButton, ScFlexItem } from '../UI/Styled';
// Misc.
import withNetworkErrorHandler from '../../hoc/withNetworkErrorHandler';
// CSS
import { HEADER_FORMAT_1, HEADER_FORMAT_2, CARD_FORMAT_1 } from '../../constants';

const AccountDashboard = (props) => {
  const [contApp, setContApp] = useState(false);
  const dispatch = useDispatch();
  const tokenREDUX = useSelector((state) => state.auth.token);
  const userIdREDUX = useSelector((state) => state.auth.userId);
  const applicationsREDUX = useSelector((state) => state.userApps.applications);
  const errorREDUX = useSelector((state) => state.userApps.error);

  // Fetch applications from Firebase if there are no network errors
  useEffect(() => {
    if (!errorREDUX) {
      dispatch(actionUserApp.fetchApplication(tokenREDUX, userIdREDUX));
      dispatch(actionUserApp.fetchUser(tokenREDUX));
    }
  }, [dispatch, tokenREDUX, userIdREDUX, errorREDUX]);

  // Check session storage to check if there are unfinished applications
  useEffect(() => {
    const sessionPersonalData = sessionStorage.getItem('sessionPersonalData');
    if (sessionPersonalData) {
      setContApp(true);
    }
  }, []);

  const startApplication = () => {
    props.history.push({ pathname: '/personalinfo' });
  };

  return (
    <>
      <ScCard width={50} shadow="SmoothXs">
        <ScTextBox fontSize={1.8}>
          {contApp
            ? 'Return to your unfinished application'
            : `You don't have any outstanding applications`}{' '}
        </ScTextBox>
        <Spacer>
          <ScButton variant="secondary" width="100%" onClick={startApplication}>
            {contApp ? 'Continue' : 'Start New'} Application
          </ScButton>
        </Spacer>
        <Spacer>
          {applicationsREDUX.length ? (
            <ScHeader as="h2" fontSize={3} fontWeight={500} color="secondary" mBot={1} mTop={2}>
              Application History
            </ScHeader>
          ) : (
            ''
          )}
          {applicationsREDUX.map((application, index) => {
            return (
              <Spacer mTop={0.1} mBot={2} key={application.appNumber}>
                <ScCard {...CARD_FORMAT_1}>
                  <Spacer mTop={0.1} mBot={1}>
                    <ScHeader {...HEADER_FORMAT_2}>
                      Application ID: {application.appNumber}
                    </ScHeader>
                    <ScFlexBox justify="flex-start">
                      <ScFlexItem basis="50%">
                        <ScHeader as="h4" {...HEADER_FORMAT_1}>
                          Date Submitted:
                        </ScHeader>
                        <ScTextBox padding="0.3rem">{application.appDate}</ScTextBox>
                      </ScFlexItem>
                      <ScFlexItem basis="50%">
                        <ScHeader as="h4" {...HEADER_FORMAT_1}>
                          Application Status:
                        </ScHeader>
                        <ScTextBox padding="0.3rem">Pending</ScTextBox>
                      </ScFlexItem>
                    </ScFlexBox>
                  </Spacer>
                </ScCard>
              </Spacer>
            );
          })}
        </Spacer>
      </ScCard>
    </>
  );
};

export default withNetworkErrorHandler(AccountDashboard);
