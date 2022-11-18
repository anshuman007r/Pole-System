import { screen, render, waitFor } from '@testing-library/react';
import { Routes, StoreWrapper, RouterWrapper } from '../Container'
import { createMemoryHistory } from 'history'
import { storeFactory } from '../helper'
import { Redirect, Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'


let store
const history = createMemoryHistory();

const compSetup = async (initialState = {}) =>{
  store = storeFactory(initialState)
  await act( async () => render(
    <Router history={history}>
      <StoreWrapper store={store}>
        <Routes/>
      </StoreWrapper>
    </Router>
  ))
}

describe('Route testing', () => {
  test('by default login link should render',() =>{
    let storeTest = storeFactory({})
    render(
      <Router history={history}>
        <StoreWrapper store={storeTest}>
          <Routes/>
        </StoreWrapper>
      </Router>
    )
    expect(history.location.pathname).toMatch('/login')
  })
  test('on pushing register link it should register',() =>{
    compSetup({})
    history.push('/register')
    expect(history.location.pathname).toMatch('/register')
  })
  test('when user is logged in main page link should render', ()=>{
    compSetup({ loggedUserReducer : {}})
    expect(history.location.pathname).toMatch('/')   
  })
})