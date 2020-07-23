import React, { useState } from 'react';
import { MyBackdrop } from '../UI/CustomUI/BackDrop/MyBackdrop';
import { MyModal } from '../UI/CustomUI/Modal/MyModal';

export const ErrorModal = ({ message }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && <MyBackdrop clicked={() => setShow(false)} />}
      {show && <MyModal clicked={() => setShow(false)}>{show ? message : null}</MyModal>}
    </>
  );
};
