import { fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import React from 'react'
import { MainPage } from "../../Container";
import StoreWrapper from "../../Container/StoreWrapper";

const compSetup = (initialState = {}, props = {}) =>{
    return render(
        <StoreWrapper initialState = {initialState}>
            <MainPage { ...props }/>
        </StoreWrapper>
    )
}

test('component rendered without error', () => {
    compSetup({})
    const container = screen.queryByTestId('main-page-container')
    expect(container).toBeInTheDocument()
})

test('component should have header container',() =>{
    compSetup({})
    const headerContainer = screen.queryByTestId("header-container")
    expect(headerContainer).toBeInTheDocument()
})

describe('rendering of image label', () =>{
    test("if user first name and last name is missing label shouldn't render", () =>{
        compSetup({})
        const imageLabel = screen.queryByTestId('image-label')
        expect(imageLabel).not.toBeInTheDocument()
    })

    describe('if user first name and last name is not missing', () =>{
        const userDetail = {
            firstName : 'Ankit',
            lastName : 'Kumar',
            role : 'user',
            userName : 'ankit'
        }
        test("label should render", () =>{
            compSetup({loggedUserReducer : { ...userDetail}})
            const imageLabel = screen.queryByTestId('image-label')
            expect(imageLabel).toBeInTheDocument()
        })
        test("label text should match", () =>{
            compSetup({ loggedUserReducer : { ...userDetail}})
            const textContent = `Welcome back ${userDetail?.firstName} ${userDetail?.lastName} !`
            const imageLabel = screen.queryByTestId('image-label')
            expect(imageLabel).toHaveTextContent(textContent)
        })
    })
})