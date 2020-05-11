import React from 'react';
import { CSSTransition } from 'react-transition-group';
import classModule from './MyModal.module.css';

export const MyModal = (props) => {
  return (
    <React.Fragment>
      {/* <CSSTransition
        timeout={200}
        mountOnEnter
        unmountOnExit
        className={classModule.Modal}
        classNames={{
          enter: classModule.fadeEnter,
          enterActive: classModule.fadeEnterActive,
          exitActive: classModule.fadeExit,
          exit: classModule.fadeExitActive,
        }}
      > */}
      Network Error
      <button onClick={props.closed}>Dismiss</button>
      {/* </CSSTransition> */}
    </React.Fragment>
  );
};

export default MyModal;
