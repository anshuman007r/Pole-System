import { fireEvent, render, screen} from "@testing-library/react";
import React from 'react'
import { Header } from '..'
import StoreWrapper from "../../Container/StoreWrapper";
import { RouterWrapper } from "../../Container";


const setActiveMock = jest.fn()

// jest.mock('react', ()=>{
//     const React = require('react')
//     return {
//         ...jest.requireActual('react'),
//         useState : (initialValue) => [ initialValue, setActiveMock]
//     }
// })

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

describe('rendering of nav bar burger button', ()=> {
    React.useState = ['', setActiveMock]
    describe('when window size is > 1016',() => {
        Object.assign(window, { innerWidth : 900})
        console.log(window.innerWidth)
        test('nav bar burger button should not be rendered', () => {
            compSetup({})
            const navBarButton = screen.queryByTestId('navbar-burger-button')
            expect(navBarButton).toBeInTheDocument()
        })
        
        test('header button should be visible in header', () => {
            const { container } = compSetup({})
            const headerButtonsContainer = container.getElementsByClassName('navbar-menu')
            expect(headerButtonsContainer[0]).not.toHaveClass('is-active')     
        })
    })

    describe('when window size is <= 1016', () => {

        describe("when nav bar burger is active", () => {
        })

        describe("when nav bar burger is not active", () => {    
        })
    })

})


