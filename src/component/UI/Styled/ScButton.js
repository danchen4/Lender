import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css, ThemeContext } from 'styled-components';

const StyledScButton = styled.button`
  width: ${({ width }) => width || '100%'};
  padding: ${({ padding }) => padding || '1.6rem 3rem'};
  font-size: ${({ fontSize }) => (fontSize || 1.6) + 'rem'};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.1s;

  &:enabled {
    transition: all 0.3s;
  }

  &:disabled:hover {
    transform: none;
    box-shadow: none;
    background-color: ${({ theme }) => theme.palette.text.disabled};
    color: ${({ theme }) => theme.palette.text.secondary};
    border: none;
  }

  &:hover {
    transform: translateY(-0.2rem);
    box-shadow: ${({ theme }) => theme.shadow.Xs};
  }

  &:focus {
    outline: none;
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.shadow.Xxs};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.palette.text.disabled};
    color: ${({ theme }) => theme.palette.text.secondary};
    border: none;
    cursor: default;
  }

  ${({ variant }) => {
    if (variant === 'primary') {
      return css`
        color: ${({ theme }) => theme.palette.common.white};
        background-color: ${({ theme }) => theme.palette.primary.dark};

        &:hover {
          background-color: ${({ theme }) => theme.palette.primary.main};
        }
      `;
    }
    if (variant === 'secondary') {
      return css`
        color: ${({ theme }) => theme.palette.common.white};
        background-color: ${({ theme }) => theme.palette.secondary.dark};

        &:hover {
          background-color: ${({ theme }) => theme.palette.secondary.main};
        }
      `;
    }
    if (variant === 'outlined') {
      return css`
        color: ${({ variantColor, constants }) => constants.main[variantColor]};
        border: 2px solid ${({ variantColor, constants }) => constants.main[variantColor]};
        background-color: ${({ theme }) => theme.palette.common.white};

        &:hover {
          color: ${({ theme }) => theme.palette.common.white};
          background-color: ${({ variantColor, constants }) => constants.light[variantColor]};
          border: 2px solid ${({ variantColor, constants }) => constants.main[variantColor]};
        }

        &:disabled:hover {
          text-decoration: none;
        }
      `;
    }
    if (variant === 'text') {
      return css`
        color: ${({ variantColor, constants }) => constants.main[variantColor]};

        &:hover {
          color: ${({ variantColor, constants }) => constants.light[variantColor]};
          background-color: transparent;
          box-shadow: none;
          transform: none;
        }

        &:disabled:hover {
          text-decoration: none;
          background-color: transparent;
        }

        &:focus {
          text-decoration: none;
          box-shadow: none;
          transform: none;
        }

        &:disabled {
          color: ${({ theme }) => theme.palette.text.secondary};
          background-color: transparent;
          border: none;
        }
      `;
    }
  }}
`;

export const ScButton = ({
  variant,
  type,
  disabled,
  width,
  padding,
  fontSize,
  variantColor,
  onClick,
  children,
}) => {
  const themeContext = useContext(ThemeContext);
  const COLOR_MAIN = {
    primary: themeContext.palette.primary.dark,
    secondary: themeContext.palette.secondary.main,
    error: themeContext.palette.error.main,
    text: themeContext.palette.text.primary,
    textSecondary: themeContext.palette.text.secondary,
  };
  const COLOR_LIGHT = {
    primary: themeContext.palette.primary.main,
    secondary: themeContext.palette.secondary.light,
    error: themeContext.palette.error.light,
    text: themeContext.palette.text.disabled,
    textSecondary: themeContext.palette.text.primary,
  };

  return (
    <StyledScButton
      constants={{ main: COLOR_MAIN, light: COLOR_LIGHT }}
      variant={variant}
      type={type}
      disabled={disabled}
      width={width}
      padding={padding}
      fontSize={fontSize}
      variantColor={variantColor}
      onClick={onClick}
    >
      {children}
    </StyledScButton>
  );
};

ScButton.propTypes = {
  variant: PropTypes.oneOf(['primary, secondary, outlined, text']),
  width: PropTypes.string,
  padding: PropTypes.string,
  fontSize: PropTypes.number,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  variantColor: PropTypes.oneOf(['primary, secondary, error, text, textSecondary']),
  onClick: PropTypes.func,
};
