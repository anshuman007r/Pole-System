import { fireEvent, render, screen} from "@testing-library/react";
import { List } from '../Component'
import StoreWrapper from "../Container/StoreWrapper";

const compSetup = (initialState = {}, props = {}) =>{
    return render(
        <StoreWrapper initialState = {initialState}>
            <List { ...props }/>
        </StoreWrapper>

    )
}

test('component rendered without error', () => {
    compSetup({})
    const container = screen.queryByTestId('list-container')
    expect(container).toBeInTheDocument()
})
