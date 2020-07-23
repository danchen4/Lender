import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPageContent = styled.div`
  margin: ${({ margin }) => (margin || 5) + 'rem 0'};
  min-height: calc(100vh - 10rem);
  @media ${({ theme }) => theme.bp.phone} {
    padding: 0 0.5rem;
    margin: 2rem 0;
  }
`;

export const PageContent = ({ margin, height, children }) => {
  return (
    <StyledPageContent margin={margin} height={height}>
      {children}
    </StyledPageContent>
  );
};

PageContent.propTypes = {
  margin: PropTypes.number,
  height: PropTypes.string,
};
