import React, { useEffect, useContext } from 'react'
import {Redirect} from 'react-router-dom'

import {AuthContext} from '../../context/auth-context';

const Logout = ({onLogout}) => {
  const authContext = useContext(AuthContext)

  useEffect(()=>{
    authContext.logoutAccount();
  },[authContext])

  return <Redirect to="/login"/>
}

export default Logout;

