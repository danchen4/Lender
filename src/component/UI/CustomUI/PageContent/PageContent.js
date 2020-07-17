import React from 'react';
import styled from 'styled-components';

const StyledPageContent = styled.section`
  margin: ${({ margin }) => (margin || 5) + 'rem 0'};
  height: 100%;
`;

export const PageContent = ({ margin, children }) => (
  <StyledPageContent margin={margin}>{children}</StyledPageContent>
);
