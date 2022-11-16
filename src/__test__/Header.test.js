import { fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import React from 'react'
import { Header } from '../Component'
import StoreWrapper from "../Container/StoreWrapper";
import { RouterWrapper } from "../Container";
import { storeFactory } from "../helper";
import constants from "../Constants";

const {
    ADMIN,
    USER,
    CLOSE_LIST,
    ADD_POLE,
    OPEN_LIST,
    OPEN_POLES,
    CLOSE_POLES,
} = constants

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

describe('rendering of header button', () => {
    describe('when page props is not passed', () =>{
        test('when role is admin both open list and close list button should render', ()=>{
            compSetup({loggedUserReducer : { role : ADMIN }}, {})
            const headerButtons = screen.queryAllByTestId('header-button')
            const attributes = headerButtons.map(o => o.getAttribute('name'))
            expect(attributes).toEqual([OPEN_LIST, CLOSE_LIST])
        })
        test('when role is user only open list button should render', ()=>{
            compSetup({loggedUserReducer : { role : USER }}, {})
            const headerButtons = screen.queryAllByTestId('header-button')
            console.log(headerButtons)
            expect(headerButtons[0]).toHaveAttribute("name", OPEN_LIST)  
        })
    })

    describe('when page props is passed as open poles', () =>{
        test('when role is admin add pole button should render', ()=>{
            compSetup({loggedUserReducer : { role : ADMIN }}, { page : OPEN_POLES })
            const headerButtons = screen.queryAllByTestId('header-button')
            console.log(headerButtons)
            expect(headerButtons[0]).toHaveAttribute("name", ADD_POLE)  
        })
        test('when role is user header button other than logout should not be render', ()=>{
            compSetup({loggedUserReducer : { role : USER}}, { page : OPEN_POLES })
            const headerButtons = screen.queryAllByTestId('header-button')
            expect(headerButtons).toHaveLength(0)      
        })
    })

    describe('when page props is passed other as open poles', () =>{
        test('when role is user header button other than logout should not be render', ()=>{
            compSetup({}, { page : CLOSE_POLES })
            const headerButtons = screen.queryAllByTestId('header-button')
            expect(headerButtons).toHaveLength(0)
        })
    })
})