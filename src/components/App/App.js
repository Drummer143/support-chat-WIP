import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


import store from './../../redux/store';

import styles from './App.module.css';
import RoutingTree from './../RoutingTree/RoutingTree';

function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className={styles.wrapper}>
          <RoutingTree />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
