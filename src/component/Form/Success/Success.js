import React from 'react';
//Components
import { Spacer, ScCard, ScHeader, ScTextBox, ScButton } from '../../UI/Styled';

const FormPersonal = ({ pathNext, history }) => {
  const nextStep = () => {
    history.push({ pathname: pathNext });
  };

  return (
    <ScCard width={50} shadow="SmoothXs">
      <ScHeader as="h2" fontSize={3} fontWeight={500} color="secondary" mBot={1} mTop={2}>
        Success!
      </ScHeader>
      <ScTextBox fontSize={1.8}>Thank you for your submission.</ScTextBox>
      <Spacer>
        <ScButton variant="secondary" width="100%" onClick={nextStep}>
          Go to Application Dashboard
        </ScButton>
      </Spacer>
    </ScCard>
  );
};

export default FormPersonal;
