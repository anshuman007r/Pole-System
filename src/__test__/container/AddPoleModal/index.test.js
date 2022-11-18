import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { RouterWrapper, StoreWrapper, AddPoleModal } from '../../../Container';
import constants from '../../../Constants';
import { storeFactory } from '../../../helper';

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
                <AddPoleModal { ...props }/>
            </StoreWrapper>
        </RouterWrapper>
    )
}

describe('rendering of modal', () =>{
    const open = { state : true, type : ADD}
    describe('by default',()=>{
        test('modal should not render',() =>{
            compSetup({})
            const modalContainer = screen.queryByTestId('modal-container')
            expect(modalContainer).not.toBeInTheDocument()
        })
        test('cancel button & save button should not render', () =>{
            compSetup({},{})
            const footerButton = screen.queryAllByRole('button')
            const cancelButton = footerButton.find(o => o.getAttributeNode('class').value === 'ant-btn ant-btn-default cancel-button')
            const saveButton = footerButton.find(o => o.getAttributeNode('class').value === 'ant-btn ant-btn-primary save-button')
            const footBtn = [cancelButton, saveButton]?.filter(btn => btn)
            expect(footBtn).toHaveLength(0)
        })
    })
    describe('on passing open object in props',() =>{
        test('modal should render', () =>{
            compSetup({},{open})
            const modalContainer = screen.queryByTestId('modal-container')
            expect(modalContainer).toBeInTheDocument()
        })
        test('cancel button should render', () =>{
            compSetup({},{open})
            const footerButton = screen.getAllByRole('button')
            footerButton.find(o => o.getAttributeNode(<span></span>))
            const cancelButton = footerButton.find(o => o.getAttributeNode('class').value === 'ant-btn ant-btn-default cancel-button')
            expect(cancelButton).toBeInTheDocument()
        })
        test('save button should render', () =>{
            compSetup({},{open})
            const footerButton = screen.getAllByRole('button')
            const saveButton = footerButton.find(o => o.getAttributeNode('class').value === 'ant-btn ant-btn-primary save-button')
            expect(saveButton).toBeInTheDocument()
        })
        test('save button should be disabled', () =>{
            compSetup({},{open})
            const footerButton = screen.getAllByRole('button')
            const saveButton = footerButton.find(o => o.getAttributeNode('class').value === 'ant-btn ant-btn-primary save-button')
            // console.log(saveButton)
            expect(saveButton).toBeDisabled()         
        })
        test('cancel button should be enabled', () =>{
            compSetup({},{open})
            const footerButton = screen.getAllByRole('button')
            const cancelButton = footerButton.find(o => o.getAttributeNode('class').value === 'ant-btn ant-btn-default cancel-button')
            expect(cancelButton).not.toBeDisabled()
        })
    })
})

describe('rendering of modal header label', () =>{
    const open = { state : true, type : ADD}
    test('by default label should not render',() =>{
        compSetup({})
        const modalContainer = screen.queryByTestId('modal-container')
        expect(modalContainer).toBeNull()
    })

    test('when open has type add then header label should be Add pole',() =>{
        compSetup({},{ open })
        const headerTitle = screen.queryByTestId('modal-container')
        expect(headerTitle).toHaveTextContent(ADD_POLE)
    })

    test('when open has type edit then header label should be Edit pole',() =>{
        compSetup({},{ open : {...open, type : EDIT }})
        const headerTitle = screen.queryByTestId('modal-container')
        expect(headerTitle).toHaveTextContent(EDIT_POLE)
    })
})

describe('rendering of alert', () =>{
    const open = { state : true, type : ADD}
    const errorMsg = "Testing error alert" 
    test('by default alert should not render', () =>{
        compSetup({},{})
        const alert = screen.queryByTestId('modal-error')
        expect(alert).not.toBeInTheDocument()       
    })
    describe('on passing error',() =>{
        beforeEach(()=>{
            compSetup({},{open, error : errorMsg})
        })
        test('alert should render', () =>{
            const alert = screen.queryByTestId('modal-error')
            expect(alert).toBeInTheDocument()       
        }) 
        test('alert type should be error', () =>{
            const alert = screen.queryByTestId('modal-error')
            expect(alert).toHaveClass('ant-alert-error')   
        })
        test('alert message should match', () =>{
            const alert = screen.queryByTestId('modal-error')
            expect(alert).toHaveTextContent(errorMsg)
        })
    })
})
