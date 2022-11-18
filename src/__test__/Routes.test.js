import { screen, render, waitFor} from '@testing-library/react';
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

const userMockJSON = {
  userName : 'ankit',
  firstName : 'Ankit',
  lastName : "Kumar",
  role : 'user'
}

describe('Route testing', () => {
  test('by default login link should render', async() =>{
    compSetup({})
    await waitFor(() => screen.queryByText(/protected/i));
    expect(history.location.pathname).toMatch('/login')
  })
  test('on pushing register link it should register',() =>{
    compSetup({})
    history.push('/register')
    expect(history.location.pathname).toMatch('/register')
  })
  test('on pushing mainpage link when user is not logged in, redirect to login', async() =>{
    compSetup({})
    history.push('/')
    await waitFor(() => screen.queryByText(/protected/i));
    expect(history.location.pathname).toMatch('/login')
  })
  test('when user is logged in main page link should render', ()=>{
    compSetup({ loggedUserReducer : userMockJSON })
    expect(history.location.pathname).toMatch('/')   
  })
  test('on pushing login link when user is logged in, redirect to mainpage link', async() =>{
    compSetup({ loggedUserReducer : userMockJSON})
    history.push('/login')
    await waitFor(() => screen.queryByText(/protected/i));
    expect(history.location.pathname).toMatch('/')
  })
  test('on pushing register link when user is logged in, redirect to mainpage link', async() =>{
    compSetup({ loggedUserReducer : userMockJSON})
    history.push('/register')
    await waitFor(() => screen.queryByText(/protected/i));
    expect(history.location.pathname).toMatch('/')
  })
})

