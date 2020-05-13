import React from 'react';
import { withRouter } from 'react-router-dom';
import classModule from './ButtonTransition.module.css';
import { Button } from '@material-ui/core';

const ButtonTransition = ({ children, history }) => {
  const clickHandler = () => {
    history.push('/signup');
  };

  return (
    <React.Fragment>
      <div className={classModule.Button}>
        <Button variant="contained" color="secondary" onClick={clickHandler}>
          {children}
        </Button>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ButtonTransition);
