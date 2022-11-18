import { screen, render, waitFor } from '@testing-library/react';
import { Routes, StoreWrapper, RouterWrapper } from '../Container'
import { createMemoryHistory } from 'history'
import { storeFactory } from '../helper'
import { Router } from 'react-router-dom'


let store
const history = createMemoryHistory();

const compSetup = (initialState = {}) =>{
  store = storeFactory(initialState)
  render(
    <Router history={history}>
      <StoreWrapper store={store}>
        <Routes/>
      </StoreWrapper>
    </Router>
    // </RouterWrapper> 
  )
}

describe('Route testing', () => {
  test('by default login link should render',() =>{
    compSetup({})
    expect(history.location.pathname).toMatch('/login')
  })
  test('on pushing register link it should register',() =>{
    compSetup({})
    history.push('/register')
    expect(history.location.pathname).toMatch('/register')
  })
  // test('on pushing main page link it should redirect to login page', async()=>{
  //   compSetup({})
  //   history.push('/')
  //   const path = await waitFor(()=> history.location.pathname)
  //   expect(path).toMatch('/login')   
  // })
  test('when user is logged in main page link should render', ()=>{
    compSetup({ loggedUserReducer : { userName : 'Ankit', role : 'user'}})
    expect(history.location.pathname).toMatch('/')   
  })
  //  test('on pushing main page link it should redirect to login page', async()=>{
  //   compSetup({loggedUserReducer : { userName : 'Ankit', role : 'user'}})
  //   history.push('/login')
  //   const path = await waitFor(()=> history.location.pathname)
  //   expect(path).toMatch('/login')   
  // })
})