import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';

const StyledScHeader = styled.h1`
  font-size: ${({ fontSize }) => (fontSize || 1.8) + 'rem'};
  font-weight: ${({ fontWeight }) => fontWeight || 500};
  color: ${({ color, theme, constants }) => constants.main[color] || theme.palette.primary.main};
  margin-top: ${({ mTop }) => (mTop || 1) + 'rem'};
  margin-bottom: ${({ mBot }) => (mBot || 1) + 'rem'};
`;

export const ScHeader = ({ as, fontSize, fontWeight, color, mBot, mTop, children }) => {
  const themeContext = useContext(ThemeContext);
  const COLOR_MAIN = {
    primary: themeContext.palette.primary.dark,
    secondary: themeContext.palette.secondary.main,
    error: themeContext.palette.error.main,
    text: themeContext.palette.text.primary,
    textSecondary: themeContext.palette.text.secondary,
  };

  return (
    <StyledScHeader
      constants={{ main: COLOR_MAIN }}
      as={as}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      mBot={mBot}
      mTop={mTop}
    >
      {children}
    </StyledScHeader>
  );
};

ScHeader.propTypes = {
  as: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.number,
  color: PropTypes.oneOf(['primary, secondary, error, text, textSecondary']),
  mBot: PropTypes.number,
  mTop: PropTypes.number,
};
