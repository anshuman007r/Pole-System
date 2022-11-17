import { fireEvent, render, screen} from "@testing-library/react";
import { ClosePole } from '../../Container'
import poleJSON from '../../JsonData/addPole.json'
import StoreWrapper from "../../Container/StoreWrapper";
import { isPoleExpire } from "../../helper";
import { RouterWrapper } from "../../Container";
import { storeFactory } from "../../helper";

let store

const compSetup = (initialState = {}, props = {}) =>{
    store = storeFactory(initialState)
    return render(
        <RouterWrapper>
            <StoreWrapper store={store}>
                <ClosePole { ...props }/>
            </StoreWrapper>
        </RouterWrapper>
    )
}

test('header component should render without error', () => {
    compSetup({})
    const container = screen.queryByTestId('header-container')
    expect(container).toBeInTheDocument()
})

test('list component rendered without error', () => {
    compSetup({})
    const container = screen.queryByTestId('list-container')
    expect(container).toBeInTheDocument()
})

describe('rendering of list', () => {
    const list = [ 
        {
            ...poleJSON,
            "pole_id" : "pole_1",
            "pole_name" : "Pole Test 1",
            "visted_by_user" : ['ravi'],
            "closing_date" : "2022/11/15",
        },
        {
            ...poleJSON,
            "pole_id" : "pole_2",
            "pole_name" : "Pole Test 2",
            "visted_by_user" : ['ravi', 'shayam'],
            "closing_date" : "2022/11/21",
        },
    ]

    test('by default empty list should be rendered', () => {
        compSetup({}, {})
        const emptyContainer = screen.queryByTestId('empty-container')
        expect(emptyContainer).toBeInTheDocument()
    })

    test('when passing list it should render the expired list of pole', () => {
        compSetup({ poleReducer : [ ...list] }, { })
        const expiredList = list.filter(item => isPoleExpire(item))
        const listNodes = screen.queryAllByTestId('list-item')
        expect(listNodes).toHaveLength(expiredList.length)
    })

})