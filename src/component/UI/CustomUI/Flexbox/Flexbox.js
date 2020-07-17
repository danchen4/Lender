import React from 'react';
import styled from 'styled-components';

const StyledFlexBox = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justify }) => justify || 'center'};
  align-items: ${({ align }) => align || 'center'};
`;

export const FlexBox = ({ direction, justify, align, children }) => (
  <StyledFlexBox direction={direction} justify={justify} align={align}>
    {children}
  </StyledFlexBox>
);
