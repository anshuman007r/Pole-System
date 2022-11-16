import { fireEvent, render, screen} from "@testing-library/react";
import { List } from '../../Component'
import poleJSON from '../../JsonData/addPole.json'
import StoreWrapper from "../../Container/StoreWrapper";
import constants  from "../../Constants";
import { RouterWrapper } from "../../Container";

const { 
    EXPIRED_ON,
    WILL_EXPIRE_ON,
    CLOSE_POLES,
    OPEN_POLES,
    ADMIN,
    USER
} = constants

const compSetup = (initialState = {}, props = {}) =>{
    return render(
        <RouterWrapper>
            <StoreWrapper initialState = {initialState}>
                <List { ...props }/>
            </StoreWrapper>
        </RouterWrapper>
    )
}

test('component rendered without error', () => {
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

    describe('when list is passed as a props to the component', ()=> {
        test('empty list should not be rendered', () => {
            compSetup({}, { list })
            const emptyContainer = screen.queryByTestId('empty-container')
            expect(emptyContainer).not.toBeInTheDocument()
        }) 
        test('list should contain same number of item passed as props', () => {
            compSetup({}, { list })
            const listNode = screen.queryAllByTestId('list-item')
            expect(listNode.length).toBe(list.length)
        })        
    })

    describe('rendering of expire container', () =>{
        test('when open pole page is rendered it should display will expire content', () => {
            compSetup({}, { list, page : OPEN_POLES })
            const listNode = screen.queryAllByTestId('expire-container')
            expect(listNode[1]).toHaveTextContent(WILL_EXPIRE_ON)
        }) 
        test('when close pole page is rendered it should display expired content', () => {
            compSetup({}, { list, page : CLOSE_POLES })
            const listNode = screen.queryAllByTestId('expire-container')
            expect(listNode[0]).toHaveTextContent(EXPIRED_ON)
        }) 
    })

    describe('rendering of right button', () =>{
        test('right icon buttons should not be rendered when role is user and page is open pole', () => {
            compSetup({ loggedUserReducer : { role : USER }}, { list, page : OPEN_POLES })
            const rightButtonContainerIcons = screen.queryAllByTestId('icon-button')
            expect(rightButtonContainerIcons.length).toBe(0)
        }) 
        test('right icon button should be rendered when role is admin and page is open pole', () => {
            compSetup({loggedUserReducer : { role : ADMIN }}, { list, page : OPEN_POLES })
            const rightButtonContainerIcons = screen.queryAllByTestId('icon-button')
            expect(rightButtonContainerIcons.length).not.toBe(0)
        }) 
        test('right buttons should not be rendered when role is user and page is open pole', () => {
            compSetup({ loggedUserReducer : { role : USER }}, { list, page : CLOSE_POLES })
            const resultButtons = screen.queryAllByTestId('result-button-container')
            expect(resultButtons.length).toBe(0)
        }) 
        test('right buttons should be rendered when role is admin and page is open pole', () => {
            compSetup({loggedUserReducer : { role : ADMIN }}, { list, page : CLOSE_POLES })
            const resultButtons = screen.queryAllByTestId('result-button-container')
            expect(resultButtons.length).not.toBe(0)
        }) 
    })

    test('on pole click it should redirect to oper_pole', () =>{
        compSetup({loggedUserReducer : { role : ADMIN }}, { list, page : OPEN_POLES })
        const openPoleButtons = screen.queryAllByTestId('left-content')
        fireEvent.click(openPoleButtons[0])
        expect(window.location.pathname).toMatch('/pole')
    })

    test('on click of result it should redirect to close_pole', () =>{
        compSetup({loggedUserReducer : { role : ADMIN }}, { list, page : CLOSE_POLES })
        const resultButtons = screen.queryAllByRole('button')
        fireEvent.click(resultButtons[0])
        expect(window.location.pathname).toMatch('/close_pole')
    })
})