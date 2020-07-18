import React from 'react';
import styled from 'styled-components';

const StyledSpacer = styled.div`
  display: block;
  margin-top: ${({ mTop }) => (mTop || 2.4) + 'rem'};
  margin-bottom: ${({ mBot }) => (mBot || 2.4) + 'rem'};
`;

export const Spacer = ({ mTop, mBot, children }) => (
  <StyledSpacer mTop={mTop} mBot={mBot}>
    {children}
  </StyledSpacer>
);
