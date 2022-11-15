import { fireEvent, render, screen} from "@testing-library/react";
import { Header } from '../Component'
import StoreWrapper from "../Container/StoreWrapper";

const compSetup = (initialState = {}, props = {}) =>{
    return render(
        <StoreWrapper initialState = {initialState}>
            <Header { ...props }/>
        </StoreWrapper>

    )
}

test('component rendered without error', () => {
    compSetup({})
    const container = screen.queryByTestId('header-container')
    expect(container).toBeInTheDocument()
})


