import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledFlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justify }) => justify || 'center'};
  align-items: ${({ align }) => align || 'center'};
  @media ${({ theme }) => theme.bp.tabPort} {
  }
`;

export const ScFlexBox = ({ direction, justify, align, children }) => (
  <StyledFlexBox direction={direction} justify={justify} align={align}>
    {children}
  </StyledFlexBox>
);

ScFlexBox.propTypes = {
  direction: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string,
};
