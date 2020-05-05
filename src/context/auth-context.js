import React, {useState} from 'react';
import axios from 'axios';

export const AuthContext = React.createContext({
    isAuth: false,
})

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginAccount = async (values, actions) => {
    const authData = {
      email: values.email,
      password: values.password,
      returnSecureToken: true,
    };
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsThRZYZdkCxZOt2QXRDW6ARulOx6VN74';
    actions.setSubmitting(true);
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response.data);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate); 
        localStorage.setItem('userId', response.data.localId); 
        setIsAuthenticated(true);
        checkAuthTimeout(response.data.expiresIn);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data.error.message === 'EMAIL_NOT_FOUND') {
          actions.setErrors({ email: 'Email not found' });
        }
        if (err.response.data.error.message === 'INVALID_PASSWORD') {
          actions.setErrors({ password: 'Invalid password' });
        }
      });
  }

  const logoutAccount = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
  }

  const checkAuthTimeout = (expirationTime) => {
      setTimeout(()=>{
        logoutAccount();
      },expirationTime*1000) 
  }

  const checkLoginState = () => {
      const token = localStorage.getItem('token');
      if(!token) {
        logoutAccount();
      } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        if (expirationDate > new Date()) {
          // const userId = localStorage.getItem('userId');
          // dispatch(authSuccess(token, userId));
          checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) /1000)
          setIsAuthenticated(true);
        } else {
          logoutAccount();
        }
      }
  }

  return (
    <AuthContext.Provider value={{
        isAuth: isAuthenticated, 
        loginAccount: loginAccount, 
        logoutAccount: logoutAccount,
        checkLoginState: checkLoginState,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

