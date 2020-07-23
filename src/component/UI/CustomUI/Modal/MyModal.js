import React from 'react';
import classModule from './MyModal.module.css';
import { Spacer, ScHeader, ScButton, ScCard } from '../../Styled';

export const MyModal = ({ clicked, children }) => {
  return (
    <div className={classModule.Modal}>
      <ScCard width={50} shadow="SmoothXs">
        <Spacer>
          <ScHeader as="h2" fontSize={2.6} fontWeight={400} color="error" mBot={3} mTop={1}>
            {children}
          </ScHeader>
          <ScButton variant="secondary" onClick={clicked}>
            Dismiss
          </ScButton>
        </Spacer>
      </ScCard>
    </div>
  );
};

export default MyModal;
