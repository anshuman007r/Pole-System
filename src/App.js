import React from 'react'
import './App.css';
import { Routes, StoreWrapper, RouterWrapper } from './Container'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import { store, persistedStore} from './storage/store'

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
          <RouterWrapper>
            <Routes/>
          </RouterWrapper>
          </PersistGate> 
        </Provider>
  );
}

export default App;
