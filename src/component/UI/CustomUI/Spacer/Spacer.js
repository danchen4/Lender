import React from 'react';
import styled from 'styled-components';

const StyledSpacer = styled.div`
  margin: ${({ margin }) => (margin || 2.4) + 'rem 0'};
`;

export const Spacer = ({ margin, children }) => (
  <StyledSpacer margin={margin}>{children}</StyledSpacer>
);
