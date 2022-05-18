import React from 'react';

import styles from './App.css';

import SignInForm from '../SignInForm/SignInForm';

function App() {
  return (
    <div className={styles.wrapper}>
      <SignInForm />
    </div>
  );
}

export default App;
