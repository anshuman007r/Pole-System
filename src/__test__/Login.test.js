import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Container/LoginPage/loginWrapper'
import { RouterWrapper } from '../Container';
import { createMemoryHistory } from 'history'

describe('Testing Login Page', () => {

  test('type of password input box is password',()=>{
    render(<Login />);
    const password = screen.getByTestId('password')
    expect(password).toHaveAttribute('type', 'password')
  });

  test('testing value of username',()=>{
    render(<Login />);
    const userName = screen.getByTestId('username')
    userEvent.type(userName, 'rupesh')
    expect(userName.value).toMatch('rupesh')
  })

  test('login button enable',()=>{
    render(<Login/>);
    const loginBtn = screen.getByRole('button')
    const userName = screen.getByTestId('username')
    userEvent.type(userName, 'rupesh')
    const password = screen.getByTestId('password')
    userEvent.type(password, 'rupesh@123') 
    expect(loginBtn).not.toBeDisabled()
  })

  test('login button disabled when user name is blank', ()=>{
    render(<Login/>);
    const loginButton = screen.getByRole('button')
    const username = screen.getByTestId('username')
    userEvent.type(username,'{tab}')
    const passwd = screen.getByTestId('password')
    userEvent.type(passwd, 'rupesh@123') 
    expect(loginButton).toBeDisabled()
  })

  test('login button disabled when password is blank',()=>{
    render(<Login/>);
    const loginBtn = screen.getByRole('button')
    const userName = screen.getByTestId('username')
    userEvent.type(userName, 'rupesh')
    const password = screen.getByTestId('password')
    userEvent.type(password, '{tab}') 
    expect(loginBtn).toBeDisabled()
  })

  test('redirect to register link button',()=>{
      const history = createMemoryHistory()
      render(
        <Login/>
      );
      history.push('/register')
      expect(history.location.pathname).toMatch('/register')
  })
  // const linkElement = screen.getByText(/\'\'/i);
  // expect(linkElement).toBeInTheDocument();
});
