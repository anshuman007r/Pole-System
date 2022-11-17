import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { RegisterPage } from '../../Container'
import { RouterWrapper, StoreWrapper } from '../../Container';
import constants from '../../Constants';
import { storeFactory } from '../../helper';

const { 
    REGISTER,
    PASSWORD_MISMATCH_ERROR,
    USER,
    USER_NAME_EXIST,
    USER_CREATED_MESSAGE
} = constants

let store

const compSetup = (initialState = {}, props = {}) =>{
    store = storeFactory(initialState)
    return render(
        <RouterWrapper>
            <StoreWrapper store={store}>
                <RegisterPage { ...props }/>
            </StoreWrapper>
        </RouterWrapper>
    )
}

test('component should render without error', () => {
    compSetup({}, {})
    const container = screen.queryByTestId('register-container')
    expect(container).toBeInTheDocument()
})

test('label should have text register', () => {
    compSetup({}, {})
    const container = screen.queryByTestId('register-label')
    expect(container).toHaveTextContent(REGISTER)
})

describe('render of alert', () =>{
    test('by default alert should not render', () =>{
        compSetup({}, {})   
        const alertBox = screen.queryByTestId('register-alert')
        expect(alertBox).not.toBeInTheDocument()
    })
    describe('when password and confirm password is not same', () =>{
        beforeEach(()=>{
            compSetup({}, {})   
            const firstName = screen.queryByTestId('first-name')
            const lastName = screen.queryByTestId('last-name')
            const userName = screen.queryByTestId('user-name')
            const password = screen.queryByTestId('password')
            const confirmPass = screen.queryByTestId('confirm-password') 
            const role = screen.queryByRole('combobox')
            fireEvent.change(firstName, { target : { value : 'Ankit' }})
            fireEvent.change(lastName, { target : { value : 'Kumar' }})
            fireEvent.change(userName, { target : { value : 'ankit' }})
            fireEvent.change(password, { target : { value : 'welcome@123' }})
            fireEvent.change(confirmPass, { target : { value : 'welcome@123!' }})
            fireEvent.change(role, {target : { value : 'user'}})
            const registerButton = screen.queryByTestId('register-button')
            fireEvent.click(registerButton)
        })
        test('alert should render', () =>{
            const alertBox = screen.queryByTestId('register-alert')
            expect(alertBox).toBeInTheDocument()
        })
        test('type attribute of alert should be error', () =>{
            const alertBox = screen.queryByTestId('register-alert')
            expect(alertBox).toHaveClass('ant-alert-error')      
        })
        test('message should be password and confirm password did not match', () =>{
            const alertBox = screen.queryByTestId('register-alert') 
            expect(alertBox).toHaveTextContent(PASSWORD_MISMATCH_ERROR)    
        })
    })
    describe('when user already exist', () => {
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
        beforeEach(()=>{
            compSetup({ usersReducer : userArr }, {})   
            const firstName = screen.queryByTestId('first-name')
            const lastName = screen.queryByTestId('last-name')
            const userName = screen.queryByTestId('user-name')
            const password = screen.queryByTestId('password')
            const confirmPass = screen.queryByTestId('confirm-password') 
            const role = screen.queryByRole('combobox')
            fireEvent.change(firstName, { target : { value : 'Ankit' }})
            fireEvent.change(lastName, { target : { value : 'Kumar' }})
            fireEvent.change(userName, { target : { value : 'ankit' }})
            fireEvent.change(password, { target : { value : 'welcome@123' }})
            fireEvent.change(confirmPass, { target : { value : 'welcome@123' }})
            fireEvent.change(role, {target : { value : 'user'}})
            const registerButton = screen.queryByTestId('register-button')
            fireEvent.click(registerButton)
        })
        test('alert should render', () =>{
            const alertBox = screen.queryByTestId('register-alert')
            expect(alertBox).toBeInTheDocument()
        })
        test('type attribute of alert should be error', () =>{
            const alertBox = screen.queryByTestId('register-alert')
            expect(alertBox).toHaveClass('ant-alert-error')      
        })
        test('message should be user already exist', () =>{
            const alertBox = screen.queryByTestId('register-alert') 
            expect(alertBox).toHaveTextContent(USER_NAME_EXIST)    
        })
    })
    describe("when user does not exist", ()=>{
        const userMockArr = [
            {
                firstName : 'Ankit',
                lastName : 'Kumar',
                userName : 'ankit',
                password : 'welcome@123',
                confirmPassword : 'welcome@123',
                role : USER
            }
        ]
        beforeEach(()=>{
            compSetup({ usersReducer : [] }, {})   
            const firstName = screen.queryByTestId('first-name')
            const lastName = screen.queryByTestId('last-name')
            const userName = screen.queryByTestId('user-name')
            const password = screen.queryByTestId('password')
            const confirmPass = screen.queryByTestId('confirm-password') 
            const role = screen.queryByRole('combobox')
            fireEvent.change(firstName, { target : { value : 'Ankit' }})
            fireEvent.change(lastName, { target : { value : 'Kumar' }})
            fireEvent.change(userName, { target : { value : 'ankit' }})
            fireEvent.change(password, { target : { value : 'welcome@123' }})
            fireEvent.change(confirmPass, { target : { value : 'welcome@123' }})
            fireEvent.change(role, {target : { value : 'user'}})
            const registerButton = screen.queryByTestId('register-button')
            fireEvent.click(registerButton)
        })
        test('alert should render', () =>{
            const alertBox = screen.queryByTestId('register-alert')
            expect(alertBox).toBeInTheDocument()
        })
        test('type attribute of alert should be error', () =>{
            const alertBox = screen.queryByTestId('register-alert')
            expect(alertBox).toHaveClass('ant-alert-success')      
        })
        test('message should be user already exist', () =>{
            const alertBox = screen.queryByTestId('register-alert') 
            expect(alertBox).toHaveTextContent(USER_CREATED_MESSAGE)    
        })
        test('store should be updated', () =>{
            const { usersReducer : userArr } = store.getState()
            expect(userArr).toStrictEqual(userMockArr)
        })
    })
})

describe('render of footer button', () => {
    test('on click of already have an account, path name of url should contain /login', () =>{
        compSetup({}, {})
        const loginLink = screen.queryByTestId('register-login-link')
        fireEvent.click(loginLink)
        expect(window.location.pathname).toMatch('/login')
    })
    describe('rendering of register button', () =>{
        test('by default register button should be disabled', () =>{
            compSetup({}, {})
            const registerButton = screen.queryByTestId('register-button')
            expect(registerButton).toBeDisabled()  // when disabled is true  
        })
        test('when all the field are not empty then register button shoud be enabled', () =>{
            compSetup({}, {})   
            const firstName = screen.queryByTestId('first-name')
            const lastName = screen.queryByTestId('last-name')
            const userName = screen.queryByTestId('user-name')
            const password = screen.queryByTestId('password')
            const confirmPass = screen.queryByTestId('confirm-password') 
            const role = screen.queryByRole('combobox')
            fireEvent.change(firstName, { target : { value : 'Ankit' }})
            fireEvent.change(lastName, { target : { value : 'Kumar' }})
            fireEvent.change(userName, { target : { value : 'ankit' }})
            fireEvent.change(password, { target : { value : 'welcome@123' }})
            fireEvent.change(confirmPass, { target : { value : 'welcome@123' }})
            fireEvent.change(role, {target : { value : 'user'}})
            const registerButton = screen.queryByTestId('register-button')
            expect(registerButton).not.toBeDisabled()  // when disabled is false
        })
        test('when first name and last name has some value but other field does not then register button should be disabled', () =>{
            compSetup({}, {})   
            const firstName = screen.queryByTestId('first-name')
            const lastName = screen.queryByTestId('last-name')
            fireEvent.change(firstName, { target : { value : 'Ankit' }})
            fireEvent.change(lastName, { target : { value : 'Kumar' }})
            const registerButton = screen.queryByTestId('register-button')
            expect(registerButton).toBeDisabled()   // when disabled is true
        })
        test('when only first name field is empty register button should be disabled', () =>{
            compSetup({}, {})   
            const lastName = screen.queryByTestId('last-name')
            const userName = screen.queryByTestId('user-name')
            const password = screen.queryByTestId('password')
            const confirmPass = screen.queryByTestId('confirm-password') 
            const role = screen.queryByRole('combobox')
            fireEvent.change(lastName, { target : { value : 'Kumar' }})
            fireEvent.change(userName, { target : { value : 'ankit' }})
            fireEvent.change(password, { target : { value : 'welcome@123' }})
            fireEvent.change(confirmPass, { target : { value : 'welcome@123' }})
            fireEvent.change(role, {target : { value : 'user'}})
            const registerButton = screen.queryByTestId('register-button')
            expect(registerButton).toBeDisabled()  // when disabled is true
        })
    })
})