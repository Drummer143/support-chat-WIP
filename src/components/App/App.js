import React from 'react';

import styles from './App.module.css';

import SignInForm from '../SignInForm/SignInForm';

function App() {
  return (
    <div className={styles.wrapper}>
      <SignInForm />
    </div>
  );
}

export default App;
