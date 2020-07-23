import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLOR } from '../../../theme';

const StyledScCard = styled.div`
  transition: all 0.1s;
  max-width: ${({ width }) => (width || 40) + 'rem'};
  width: 100%;
  margin: 0 auto;
  padding: ${({ padding }) => padding || '2rem 3rem'};
  box-shadow: ${({ shadow, theme }) => theme.shadow[shadow]};
  background-color: ${({ bgColor, colorGrade }) => COLOR[colorGrade || 'main'][bgColor]};
  border: ${({ bColor, borderPx, colorGrade }) => {
    if (bColor === 'none') {
      return 'none';
    } else {
      return (borderPx || 1) + 'px solid ' + COLOR[colorGrade || 'main'][bColor];
    }
  }};
  border-radius: ${({ bRadius }) => (bRadius || 4) + 'px'};
  @media ${({ theme }) => theme.bp.phone} {
    padding: 2rem 1rem;
  }
`;

export const ScCard = ({
  width,
  padding,
  bgColor,
  bColor,
  borderPx,
  colorGrade,
  bRadius,
  shadow,
  children,
}) => {
  return (
    <StyledScCard
      width={width}
      padding={padding}
      shadow={shadow}
      bgColor={bgColor}
      bColor={bColor}
      borderPx={borderPx}
      colorGrade={colorGrade}
      bRadius={bRadius}
    >
      {children}
    </StyledScCard>
  );
};

ScCard.defaultProps = {
  shadow: 'none',
  bgColor: 'white',
  bColor: 'none',
  colorGrade: 'main',
};

ScCard.propTypes = {
  shadow: PropTypes.oneOf([
    'none',
    'Xxs',
    'Xs',
    'Sm',
    'Md',
    'Lg',
    'SmoothXs',
    'SmoothSm',
    'SmoothMd',
  ]),
  colorGrade: PropTypes.oneOf(['main', 'light']),
  bgColor: PropTypes.oneOf([
    'transparent',
    'white',
    'primary',
    'secondary',
    'error',
    'text',
    'grey1',
    'grey2',
    'grey3',
  ]),
  bColor: PropTypes.oneOf([
    'none',
    'primary',
    'secondary',
    'error',
    'text',
    'grey1',
    'grey2',
    'grey3',
  ]),
  borderPx: PropTypes.number,
  width: PropTypes.number,
  bRadius: PropTypes.number,
};
