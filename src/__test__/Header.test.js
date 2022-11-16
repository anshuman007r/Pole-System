import { fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import React from 'react'
import { Header } from '../Component'
import StoreWrapper from "../Container/StoreWrapper";
import { RouterWrapper } from "../Container";
import { storeFactory } from "../helper";

const compSetup = (initialState = {}, props = {}) =>{
    return render(
        <RouterWrapper>
            <StoreWrapper initialState = {initialState}>
                <Header { ...props }/>
            </StoreWrapper>
        </RouterWrapper>
    )
}

test('component rendered without error', () => {
    compSetup({})
    const container = screen.queryByTestId('header-container')
    expect(container).toBeInTheDocument()
})

describe('rendering of logout button',()=>{

    test('log out button rendered without error', () => {
        compSetup({})
        const logOutButton = screen.queryByTestId('logout-button')  
        expect(logOutButton).toBeInTheDocument() 
    })

    test('on logout click it should redirect to login', () => {
        compSetup({loggedUserReducer : { role : 'user', userName : 'test_user' }})
        const store = storeFactory({})
        const { loggedUserReducer } = store.getState()
        const logOutButton = screen.queryByTestId('logout-button') 
        fireEvent.click(logOutButton)
        expect(loggedUserReducer).toStrictEqual({})
        
    })

})

describe('rendering of back button',() =>{
    test("by default back button shouldn't be visible", () => {
        compSetup({})
        const backButton = screen.queryByTestId('back-button')
        expect(backButton).not.toBeInTheDocument()
    })
    test("when supplying some page in page prop back button should be visible", () => {
        compSetup({}, {page : 'Test page'})
        const backButton = screen.queryByTestId('back-button')
        expect(backButton).toBeInTheDocument()
    })
})

describe('rendering of nav bar burger', () =>{
    describe('when isActive is false',() =>{
        test('navbar-right should not have is-active class',()=>{
            compSetup({})
            const navBarRight = screen.queryByTestId('navbar-right')
            expect(navBarRight).not.toHaveClass('is-active')
        })
        test('close button should not render',()=>{
            compSetup({})
            const closeButton = screen.queryByTestId('close-icon')
            expect(closeButton).not.toBeInTheDocument()
        })
    }) 
    
    describe('when isActive is true',() =>{
        test('navbar-right should not have is-active class',()=>{
            compSetup({})
            const navBarRight = screen.queryByTestId('navbar-right')
            const navBarBurger = screen.queryByTestId('navbar-burger-button')
            fireEvent.click(navBarBurger)
            expect(navBarRight).toHaveClass('is-active')
        })
        test('close button should not render',()=>{
            compSetup({})
            const navBarBurger = screen.queryByTestId('navbar-burger-button')
            fireEvent.click(navBarBurger)
            const closeButton = screen.queryByTestId('close-icon')
            expect(closeButton).toBeInTheDocument()
        })
    })    
})