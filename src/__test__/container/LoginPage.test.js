import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginPage, StoreWrapper, RouterWrapper } from  '../../Container'
import constants from '../../Constants';
import { storeFactory } from '../../helper'

const { 
  LOGIN,
  USERNAME_INVALID_ERROR,
  INCORRECT_PASSWORD,
  USER,
} = constants

let store

const compSetup = (initialState = {}, props = {}) =>{
  store = storeFactory(initialState)
  return render(
      <RouterWrapper>
          <StoreWrapper store={store}>
              <LoginPage { ...props }/>
          </StoreWrapper>
      </RouterWrapper>
  )
}

test('component should render without error', () => {
  compSetup({}, {})
  const container = screen.queryByTestId('login-container')
  expect(container).toBeInTheDocument()
})

test('label should have text register', () => {
  compSetup({}, {})
  const container = screen.queryByTestId('login-label')
  expect(container).toHaveTextContent(LOGIN)
})

describe('rendering of input field',() =>{

  test('type of password input box is password',()=>{
    compSetup({})
    const password = screen.getByTestId('password')
    expect(password).toHaveAttribute('type', 'password')
  });

  test('testing value of username',()=>{
    compSetup({})
    const userName = screen.getByTestId('username')
    userEvent.type(userName, 'rupesh')
    expect(userName.value).toMatch('rupesh')
  })

})

describe('rendering of alert', () =>{
  const userArr = [
    {
        firstName : 'Ankit',
        lastName : 'Kumar',
        userName : 'ankit',
        password : 'Ankit15!!',
        confirmPassword : 'Ankit15!!',
        role : USER
    }
  ]
  test('by default alert should not render', () =>{
    compSetup({ }, {})   
    const alertBox = screen.queryByTestId('login-alert')
    expect(alertBox).not.toBeInTheDocument()
  })
  describe('when user name is invalid', () =>{
    beforeEach(()=>{
      compSetup({usersReducer : userArr })
      const userName = screen.queryByTestId('username')
      const password = screen.queryByTestId('password')
      fireEvent.change(userName, { target : { value : 'Anshuman'}})
      fireEvent.change(password, { target : { value : 'welcome@123'}})
      const loginBtn = screen.queryByTestId('login-button') 
      fireEvent.click(loginBtn)
    })
    test('alert should render',() =>{
      const alertBox = screen.queryByTestId('login-alert')
      expect(alertBox).toBeInTheDocument()
    })
    test('type of alert should be error',() =>{
      const alertBox = screen.queryByTestId('login-alert')
      expect(alertBox).toHaveClass('ant-alert-error') 
    })
    test('message should be user name is invalid', () =>{
      const alertBox = screen.queryByTestId('login-alert')
      expect(alertBox).toHaveTextContent(USERNAME_INVALID_ERROR)     
    })
  })
  describe('when passwor is invalid',() =>{
    beforeEach(()=>{
      compSetup({usersReducer : userArr })
      const userName = screen.queryByTestId('username')
      const password = screen.queryByTestId('password')
      fireEvent.change(userName, { target : { value : 'ankit'}})
      fireEvent.change(password, { target : { value : 'welcome@123'}})
      const loginBtn = screen.queryByTestId('login-button') 
      fireEvent.click(loginBtn)
    })
    test('alert should render',() =>{
      const alertBox = screen.queryByTestId('login-alert')
      expect(alertBox).toBeInTheDocument()
    })
    test('type of alert should be error',() =>{
      const alertBox = screen.queryByTestId('login-alert')
      expect(alertBox).toHaveClass('ant-alert-error') 
    })
    test('message should be password is invalid', () =>{
      const alertBox = screen.queryByTestId('login-alert') 
      expect(alertBox).toHaveTextContent(INCORRECT_PASSWORD)    
    }) 
  })
  describe('when username and password is valid',() =>{
    beforeEach(()=>{
      compSetup({usersReducer : userArr })
      const userName = screen.queryByTestId('username')
      const password = screen.queryByTestId('password')
      fireEvent.change(userName, { target : { value : 'ankit'}})
      fireEvent.change(password, { target : { value : 'Ankit15!!'}})
      const loginBtn = screen.queryByTestId('login-button') 
      fireEvent.click(loginBtn)
    })
    test('alert should not be render',() =>{
      const alertBox = screen.queryByTestId('login-alert')
      expect(alertBox).not.toBeInTheDocument()
    })
    test('store to be updated', () =>{
      const { loggedUserReducer } = store.getState()
      expect(loggedUserReducer).toStrictEqual(userArr[0])
    }) 
  })
})

describe('rendering of footer buttons', () =>{
  describe('rendering of login button', () =>{
    test('by defaut loginButton should be disabled', () =>{
      compSetup({})
      const loginBtn = screen.queryByTestId('login-button')
      expect(loginBtn).toBeDisabled() 
    })

    test('login button disabled when user name is blank', ()=>{
      compSetup({})
      const loginBtn = screen.queryByTestId('login-button')
      const username = screen.getByTestId('username')
      userEvent.type(username,'{tab}')
      const passwd = screen.getByTestId('password')
      userEvent.type(passwd, 'rupesh@123') 
      expect(loginBtn).toBeDisabled()
    })

    test('login button disabled when password is blank',()=>{
      compSetup({})
      const loginBtn = screen.queryByTestId('login-button')
      const userName = screen.getByTestId('username')
      userEvent.type(userName, 'rupesh')
      const password = screen.getByTestId('password')
      userEvent.type(password, '{tab}') 
      expect(loginBtn).toBeDisabled()
    })

    test('login button enable',()=>{
      compSetup({})
      const loginBtn = screen.queryByTestId('login-button')
      const userName = screen.getByTestId('username')
      userEvent.type(userName, 'rupesh')
      const password = screen.getByTestId('password')
      userEvent.type(password, 'rupesh@123') 
      expect(loginBtn).not.toBeDisabled()
    })
  })
  describe("rendering of link Don't have account click to regiser",() =>{
      beforeEach(() =>{
        compSetup({})
      })
      test('link should render without error',() =>{
        const registerLink = screen.queryByTestId('register-link')
        expect(registerLink).toBeInTheDocument()
      })
      test('on click of link it should redirect to register',() =>{
        const registerLink = screen.queryByTestId('register-link')
        fireEvent.click(registerLink)
        expect(window.location.pathname).toMatch('/register')
      })
  })
})