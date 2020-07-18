import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';

const StyledScCard = styled.div`
  max-width: ${({ width }) => (width || 40) + 'rem'};
  margin: 0 auto;
  padding: ${({ padding }) => padding || '2rem 3rem'};
  box-shadow: ${({ shadow, theme }) => theme.shadow[shadow] || 'none'};
  background-color: ${({ bgColor, theme, constants }) =>
    constants.main[bgColor] || theme.palette.common.white};
  border-radius: ${({ bRadius }) => (bRadius || 4) + 'px'};
`;

export const ScCard = ({ width, padding, bgColor, bRadius, shadow, children }) => {
  const themeContext = useContext(ThemeContext);

  const COLOR_MAIN = {
    primary: themeContext.palette.primary.dark,
    secondary: themeContext.palette.secondary.main,
    error: themeContext.palette.error.main,
    text: themeContext.palette.text.primary,
    textSecondary: themeContext.palette.text.secondary,
    greyLight1: themeContext.color.grey.light1,
    greyLight2: themeContext.color.grey.light2,
    greyLight3: themeContext.color.grey.light3,
  };

  return (
    <StyledScCard
      constants={{ main: COLOR_MAIN }}
      width={width}
      padding={padding}
      shadow={shadow}
      bgColor={bgColor}
      bRadius={bRadius}
    >
      {children}
    </StyledScCard>
  );
};

ScCard.propTypes = {
  shadow: PropTypes.oneOf(['Xxs, Xs, Sm, Md, Lg, SmoothXs, SmoothSm, SmoothMd']),
  bgColor: PropTypes.oneOf([
    'primary, secondary, error, text, textSecondary, greyLight1, greyLight2, greyLight3',
  ]),
  width: PropTypes.number,
  bRadius: PropTypes.number,
};
