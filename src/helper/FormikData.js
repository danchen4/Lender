import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

const StyledPre = styled.pre`
  font-size: 1.2rem;
  margin-top: 40px;
  width: 500px;
  margin: auto;
  text-align: left;
`;

export const FormikData = ({
  show,
  firstTime,
  dirty,
  isValid,
  isSubmitting,
  initialValues,
  values,
  errors,
}) => (
  <StyledDiv show={show}>
    <StyledPre>{JSON.stringify({ firstTime, dirty, isValid, isSubmitting }, null, 4)}</StyledPre>
    <StyledPre>
      <b>initial Values: </b>
      {JSON.stringify(initialValues, null, 4)}
    </StyledPre>
    <StyledPre>
      <b>values:</b> {JSON.stringify(values, null, 4)}
    </StyledPre>
    <StyledPre>
      <b>errors:</b> {JSON.stringify(errors, null, 4)}
    </StyledPre>
  </StyledDiv>
);
