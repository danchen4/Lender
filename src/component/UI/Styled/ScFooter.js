import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLOR } from '../../../theme';

const StyledScFooter = styled.div`
  height: 6rem;
  background-color: ${COLOR.light.grey1};
  box-shadow: 0 -0.5rem 2rem rgba(0, 0, 0, 0.08);
`;

export const ScFooter = ({ children }) => {
  return <StyledScFooter>{children}</StyledScFooter>;
};

ScFooter.propTypes = {};
