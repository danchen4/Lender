import React from 'react';

import './App.css';
import ButtonAppBar from './component/UI/MUI/ButtonAppBar';
import UserForm from './component/Form/UserForm';
import Layout from './container/Layout'
import AuthContextProvider from './context/auth-context';

const App = () => {
  return (
    <div className="App">
      <AuthContextProvider>
        <ButtonAppBar />
        <UserForm />
      </AuthContextProvider>
      {/* <Layout /> */}
    </div>
  );
};

export default App;
