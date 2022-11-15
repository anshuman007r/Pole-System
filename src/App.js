import React from 'react'
import './App.css';
import { Routes, StoreWrapper, RouterWrapper } from './Container'


function App() {
  return (
        <StoreWrapper>
          <RouterWrapper>
            <Routes/>
          </RouterWrapper>
        </StoreWrapper>
  );
}

export default App;
