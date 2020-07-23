import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLOR } from '../../../theme';

const StyledScLink = styled(Link)`
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1rem 0;
  display: inline-block;
  color: ${({ color, theme }) => COLOR['main'][color] || theme.palette.primary.main};
  &:hover {
    color: ${({ color, theme }) => COLOR['light'][color] || theme.palette.primary.light};
  }
`;

export const ScLink = ({ to, color, children }) => {
  return (
    <StyledScLink to={to} color={color}>
      {children}
    </StyledScLink>
  );
};

ScLink.propTypes = {
  to: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'white',
    'primary',
    'secondary',
    'error',
    'text',
    'grey1',
    'grey2',
    'grey3',
  ]),
};
