import { fireEvent, render, screen} from "@testing-library/react";
import { PoleResult } from '../../Container'
import poleJSON from '../../JsonData/addPole.json'
import StoreWrapper from "../../Container/StoreWrapper";
import { isPoleExpire } from "../../helper";
import { RouterWrapper } from "../../Container";
import constants from "../../Constants";

const { 
    ADMIN,
    EDIT
} = constants

const compSetup = (initialState = {}, props = {}) =>{
    return render(
        <RouterWrapper>
            <StoreWrapper initialState = {initialState}>
                <PoleResult { ...props }/>
            </StoreWrapper>
        </RouterWrapper>
    )
}



test('body content should render without error', () => {
    compSetup({}, { match : { params : { poleId : 'pole_1'}}})
    const container = screen.queryByTestId('pole-result-content')
    expect(container).toBeInTheDocument()
})

test('header component should render without error', () => {
    compSetup({}, { match : { params : { poleId : 'pole_1'}}})
    const container = screen.queryByTestId('header-container')
    expect(container).toBeInTheDocument()
})