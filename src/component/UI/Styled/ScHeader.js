import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLOR } from '../../../theme';

const StyledScHeader = styled.h1`
  display: inline-block;
  font-size: ${({ fontSize }) => (fontSize || 1.8) + 'rem'};
  font-weight: ${({ fontWeight }) => fontWeight || 500};
  color: ${({ color, colorGrade, theme }) =>
    COLOR[colorGrade || 'main'][color] || theme.palette.primary.main};
  margin-top: ${({ mTop }) => (mTop || 1) + 'rem'};
  margin-bottom: ${({ mBot }) => (mBot || 1) + 'rem'};
  @media ${({ theme }) => theme.bp.phone} {
    font-size: ${({ fontSize }) => (parseFloat(fontSize * 0.9).toFixed(1) || 1.4) + 'rem'};
  }
`;

export const ScHeader = ({ as, fontSize, fontWeight, color, colorGrade, mBot, mTop, children }) => {
  return (
    <StyledScHeader
      as={as}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      colorGrade={colorGrade}
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
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'error',
    'text',
    'disabled',
    'grey1',
    'grey2',
    'grey3',
  ]),
  colorGrade: PropTypes.oneOf(['main', 'light']),
  mBot: PropTypes.number,
  mTop: PropTypes.number,
};
