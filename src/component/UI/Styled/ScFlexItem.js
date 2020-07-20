import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledScFlexItem = styled.div`
  flex-basis: ${({ basis }) => basis || '100%'};
  padding: ${({ padding }) => padding || '1rem'};
  order: ${({ order }) => order || 1};
`;

export const ScFlexItem = ({ basis, padding, order, children }) => (
  <StyledScFlexItem basis={basis} padding={padding} order={order}>
    {children}
  </StyledScFlexItem>
);

ScFlexItem.propTypes = {
  basis: PropTypes.string,
  padding: PropTypes.string,
  order: PropTypes.number,
};
