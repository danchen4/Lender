import React from 'react';
// Router
import { useRouteMatch } from 'react-router-dom';
// Material UI
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import CreateIcon from '@material-ui/icons/Create';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
// Components
import { ScCard, ScHeader, ScFlexBox, ScFlexItem } from '../../component/UI/Styled';
// Misc.
import { sessionMatchStyle, routeMatchStyle } from '../../helper';

export const ProgressBar = () => {
  const confirmMatch = useRouteMatch('/confirm');
  const sessionPersonalData = sessionStorage.getItem('sessionPersonalData');
  const sessionIncomeData = sessionStorage.getItem('sessionIncomeData');

  return (
    <>
      <ScCard width={50} bgColor="transparent" padding="1rem">
        <ScFlexBox justify="space-around">
          <ScFlexItem basis="25%" bpPhoneBasis="25%">
            <ScFlexBox direction="column">
              <PersonOutlineIcon
                fontSize="large"
                color={sessionMatchStyle(sessionPersonalData, 'primary', 'disabled')}
              />
              <ScHeader
                fontSize={1.4}
                fontWeight={300}
                color={sessionMatchStyle(sessionPersonalData, 'primary', 'grey3')}
                colorGrade={sessionMatchStyle(sessionPersonalData, 'main', 'light')}
              >
                1. Personal
              </ScHeader>
            </ScFlexBox>
          </ScFlexItem>
          <ScFlexItem basis="25%" bpPhoneBasis="25%">
            <ScFlexBox direction="column">
              <WorkOutlineIcon
                fontSize="large"
                color={sessionMatchStyle(sessionIncomeData, 'primary', 'disabled')}
              />
              <ScHeader
                fontSize={1.4}
                fontWeight={300}
                color={sessionMatchStyle(sessionIncomeData, 'primary', 'grey3')}
                colorGrade={sessionMatchStyle(sessionIncomeData, 'main', 'light')}
              >
                2. Income
              </ScHeader>
            </ScFlexBox>
          </ScFlexItem>
          <ScFlexItem basis="25%" bpPhoneBasis="25%">
            <ScFlexBox direction="column">
              <CreateIcon
                fontSize="large"
                color={routeMatchStyle(confirmMatch, 'primary', 'disabled')}
              />
              <ScHeader
                fontSize={1.4}
                fontWeight={300}
                color={routeMatchStyle(confirmMatch, 'primary', 'grey3')}
                colorGrade={routeMatchStyle(confirmMatch, 'main', 'light')}
              >
                3. Sign
              </ScHeader>
            </ScFlexBox>
          </ScFlexItem>
          <ScFlexItem basis="25%" bpPhoneBasis="25%">
            <ScFlexBox direction="column">
              <PlaylistAddCheckIcon fontSize="large" color="disabled" />
              <ScHeader fontSize={1.4} fontWeight={300} color="grey3" colorGrade="light">
                4. Confirm
              </ScHeader>
            </ScFlexBox>
          </ScFlexItem>
        </ScFlexBox>
      </ScCard>
    </>
  );
};
