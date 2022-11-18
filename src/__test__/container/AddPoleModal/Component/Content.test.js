import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { RouterWrapper, StoreWrapper, ModalContent } from '../../../../Container';
import constants from '../../../../Constants';
import { storeFactory } from '../../../../helper';

const { 
    ADD,
    EDIT,
    EDIT_POLE,
    ADD_POLE,
    CANCEL,
} = constants

let store

const compSetup = (initialState = {}, props = {}) =>{
    store = storeFactory(initialState)
    return render(
        <RouterWrapper>
            <StoreWrapper store={store}>
                <ModalContent { ...props }/>
            </StoreWrapper>
        </RouterWrapper>
    )
}

test('component should render without error', () =>{
    compSetup({},{})
    const modalContainer = screen.queryByTestId('modal-content')
    expect(modalContainer).toBeInTheDocument()
})

