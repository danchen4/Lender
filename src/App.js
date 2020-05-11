import React from 'react';

import './App.css';
import UserForm from './container/UserForm/UserForm';
import Layout from './container/Layout/Layout';
import AuthContextProvider from './context/auth-context';

const App = () => {
  return (
    <div className="App">
      <AuthContextProvider>
        <Layout>
          <UserForm />
        </Layout>
      </AuthContextProvider>
    </div>
  );
};

export default App;
