import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledFlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justify }) => justify || 'center'};
  align-items: ${({ align }) => align || 'center'};
  @media ${({ theme }) => theme.bp.phone} {
    justify-content: ${({ bpPhoneJustify }) => bpPhoneJustify || 'space-bewteen'};
  }
`;

export const ScFlexBox = ({ direction, justify, align, bpPhoneJustify, children }) => (
  <StyledFlexBox
    direction={direction}
    justify={justify}
    align={align}
    bpPhoneJustify={bpPhoneJustify}
  >
    {children}
  </StyledFlexBox>
);

ScFlexBox.propTypes = {
  direction: PropTypes.string,
  justify: PropTypes.string,
  bpPhoneJustify: PropTypes.string,
  align: PropTypes.string,
};
