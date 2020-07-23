import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLOR } from '../../../theme';

const StyledScTextBox = styled.p`
  font-size: ${({ fontSize }) => (fontSize || 1.4) + 'rem'};
  line-height: 1.7;
  padding: ${({ padding }) => padding || '1rem'};
  color: ${({ color, colorGrade, theme }) =>
    COLOR[colorGrade || 'main'][color] || theme.palette.text.primary};
  font-weight: ${({ weight }) => weight || 400};
`;

export const ScTextBox = ({ fontSize, color, colorGrade, padding, weight, children }) => {
  return (
    <StyledScTextBox
      fontSize={fontSize}
      color={color}
      colorGrade={colorGrade}
      padding={padding}
      weight={weight}
    >
      {children}
    </StyledScTextBox>
  );
};

ScTextBox.propTypes = {
  fontSize: PropTypes.number,
  weight: PropTypes.number,
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'text', 'grey1', 'grey2', 'grey3']),
  colorGrade: PropTypes.oneOf(['main', 'light']),
  padding: PropTypes.string,
};
