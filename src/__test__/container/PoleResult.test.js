import { fireEvent, render, screen} from "@testing-library/react";
import { PoleResult } from '../../Container'
import StoreWrapper from "../../Container/StoreWrapper";
import { RouterWrapper } from "../../Container";
import constants from "../../Constants";
import { storeFactory } from "../../helper";

const { 
    ADMIN,
    USER,
    EDIT
} = constants

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
                        "vote" : 7 
                    },
                    {
                        "option_id" : "option_2",
                        "option" : "test option 2",
                        "vote" : 6 
                    }
                ]
            },
            {
                "question_id" : "question_2",
                "question" : "test 2",
                "question_visited" : "3",
                "options" : [
                    {
                        "option_id" : "option_4",
                        "option" : "test option 1",
                        "vote" : 5 
                    },
                    {
                        "option_id" : "option_5",
                        "option" : "test option 2",
                        "vote" : 3 
                    },
                    {
                        "option_id" : "option_6",
                        "option" : "test option 1",
                        "vote" : 1 
                    },
                    {
                        "option_id" : "option_7",
                        "option" : "test option 2",
                        "vote" : 20 
                    }
                ]
            }
        ],
        "pole_id" : "pole_1",
        "pole_name" : "Pole Test 1",
        "visted_by_user" : ['ravi'],
        "closing_date" : "2022/11/15",
    },
]

let store

const compSetup = (initialState = {}, props = {}) =>{
    store = storeFactory(initialState)
    return render(
        <RouterWrapper>
            <StoreWrapper store={store}>
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

describe('content child rendering', () =>{
    describe('when poleReducer is a blank array or not passed', () =>{
        test('pole name should be blank', ()=>{
            compSetup({}, { match : { params : { poleId : 'pole_1'}}})
            const poleName = screen.queryByTestId('pole-result-pole-name')
            expect(poleName).toHaveTextContent('')
        })
        test('content should have no question', ()=>{
            compSetup({}, { match : { params : { poleId : 'pole_1'}}})
            const questionNode = screen.queryAllByTestId('pole-result-question')
            expect(questionNode).toHaveLength(0)
        })
    })
    
    /* for testing below test cases we need to comment the PieChart componet.On uncomenting and testing
    the below test cases we are getting error : Cannot set property 'font' of undefined

    describe('when poleReducer is not a blank array', () =>{       
        const pole = list?.find(pol => pol?.pole_id === 'pole_1') || {} 
        test('pole name should not be blank', ()=>{
            compSetup({poleReducer : list}, { match : { params : { poleId : 'pole_1'}}})
            const poleName = screen.queryByTestId('pole-result-pole-name')
            expect(poleName).toHaveTextContent(pole?.pole_name)
        })
        test('content should have question', ()=>{
            compSetup({ poleReducer : list }, { match : { params : { poleId : 'pole_1'}}})
            const quesLength = pole?.questions?.length || 0
            const questionNode = screen.queryAllByTestId('pole-result-question')
            expect(questionNode).toHaveLength(quesLength)
        })
    })
    */
})