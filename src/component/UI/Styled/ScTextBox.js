import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledScTextBox = styled.p`
  font-size: 1.4rem;
  line-height: 1.7;
  padding: ${({ padding }) => padding || '1rem'};
  color: ${({ secondary, theme }) => secondary && theme.palette.text.secondary};
  font-weight: ${({ weight }) => weight || 400};
`;

export const ScTextBox = ({ secondary, padding, weight, children }) => {
  return (
    <StyledScTextBox secondary={secondary} padding={padding} weight={weight}>
      {children}
    </StyledScTextBox>
  );
};

ScTextBox.propTypes = {
  secondary: PropTypes.bool,
  padding: PropTypes.string,
  weight: PropTypes.number,
};
