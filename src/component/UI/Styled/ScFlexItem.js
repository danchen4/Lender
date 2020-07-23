import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledScFlexItem = styled.div`
  flex-basis: ${({ basis }) => basis || '100%'};
  padding: ${({ padding }) => padding || '1rem'};
  order: ${({ order }) => order || 1};
  @media ${({ theme }) => theme.bp.phone} {
    flex-basis: ${({ bpPhoneBasis }) => bpPhoneBasis || '50%'};
    padding: 0.3rem;
  }
`;

export const ScFlexItem = ({ basis, bpPhoneBasis, padding, order, children }) => (
  <StyledScFlexItem basis={basis} bpPhoneBasis={bpPhoneBasis} padding={padding} order={order}>
    {children}
  </StyledScFlexItem>
);

ScFlexItem.propTypes = {
  basis: PropTypes.string,
  bpPhoneBasis: PropTypes.string,
  padding: PropTypes.string,
  order: PropTypes.number,
};
