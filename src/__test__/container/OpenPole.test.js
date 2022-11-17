import { fireEvent, render, screen} from "@testing-library/react";
import { OpenPole } from '../../Container'
import StoreWrapper from "../../Container/StoreWrapper";
import { isPoleExpire } from "../../helper";
import { RouterWrapper } from "../../Container";
import constants from "../../Constants";
import { storeFactory } from "../../helper";

const { 
    ADMIN,
    EDIT
} = constants

let store

const compSetup = (initialState = {}, props = {}) =>{
    store=storeFactory(initialState)
    return render(
        <RouterWrapper>
            <StoreWrapper store={store}>
                <OpenPole { ...props }/>
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
            "questions" : [
                {
                    "question_id" : "question_1",
                    "question" : "test 1",
                    "question_visited" : "1",
                    "options" : [
                        {
                            "option_id" : "option_1",
                            "option" : "test option 1",
                            "vote" : "" 
                        },
                        {
                            "option_id" : "option_2",
                            "option" : "test option 2",
                            "vote" : "" 
                        }
                    ]
                }
            ],
            "pole_id" : "pole_1",
            "pole_name" : "Pole Test 1",
            "visted_by_user" : ['ravi'],
            "closing_date" : "2022/11/15",
        },
        {
            "questions" : [
                {
                    "question_id" : "question_2",
                    "question" : "test 2",
                    "question_visited" : "2",
                    "options" : [
                        {
                            "option_id" : "option_3",
                            "option" : "test option 3",
                            "vote" : "" 
                        },
                        {
                            "option_id" : "option_4",
                            "option" : "test option 4",
                            "vote" : "" 
                        }
                    ]
                }
            ],
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

    test('when passing list it should render the will expire pole', () => {
        compSetup({ poleReducer : [ ...list] }, { })
        const willExpireList = list.filter(item => !isPoleExpire(item))
        const listNodes = screen.queryAllByTestId('list-item')
        expect(listNodes).toHaveLength(willExpireList.length)
    })
    describe('rendering of modal', () =>{
        test('by default edit modal should not render', () => {
            compSetup({ loggedUserReducer : { role : ADMIN }, poleReducer : [ ...list] }, { })
            const modalContainer = screen.queryByTestId('modal-container')
            expect(modalContainer).not.toBeInTheDocument()
        })      
        test('on click of edit modal should render', () => {
            compSetup({ loggedUserReducer : { role : ADMIN }, poleReducer : [ ...list] }, { })
            const iconButtonNode = screen.queryAllByTestId('icon-button')
            const editButton = iconButtonNode.find(o => o.getAttribute('name') === EDIT)
            // console.log('Add Pole Button', headerButtonNode)
            fireEvent.click(editButton)
            const modalContainer = screen.queryByTestId('modal-container')
            expect(modalContainer).toBeInTheDocument()
        })
    })
})