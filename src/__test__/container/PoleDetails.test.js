import { fireEvent, render, screen} from "@testing-library/react";
import { PoleDetails } from '../../Container'
import poleJSON from '../../JsonData/addPole.json'
import StoreWrapper from "../../Container/StoreWrapper";
import { RouterWrapper } from "../../Container";
import constants from "../../Constants";

const { 
    ADMIN,
    USER,
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
                        "vote" : "" 
                    },
                    {
                        "option_id" : "option_2",
                        "option" : "test option 2",
                        "vote" : "" 
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
                        "vote" : "" 
                    },
                    {
                        "option_id" : "option_5",
                        "option" : "test option 2",
                        "vote" : "" 
                    },
                    {
                        "option_id" : "option_6",
                        "option" : "test option 1",
                        "vote" : "" 
                    },
                    {
                        "option_id" : "option_7",
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
        ...poleJSON,
        "pole_id" : "pole_2",
        "pole_name" : "Pole Test 2",
        "visted_by_user" : ['ravi', 'shayam'],
        "closing_date" : "2022/11/21",
    },
]

const compSetup = (initialState = {}, props = {}) =>{
    return render(
        <RouterWrapper>
            <StoreWrapper initialState = {initialState}>
                <PoleDetails { ...props }/>
            </StoreWrapper>
        </RouterWrapper>
    )
}

test('body content should render without error', () => {
    compSetup({},{ match : { params : { poleId : 'pole_1'}}})
    const container = screen.queryByTestId('pole-detail-content')
    expect(container).toBeInTheDocument()
})

test('header component should render without error', () => {
    compSetup({},{ match : { params : { poleId : 'pole_1'}}})
    const container = screen.queryByTestId('header-container')
    expect(container).toBeInTheDocument()
})

test('footer content should render without error', () => {
    compSetup({},{ match : { params : { poleId : 'pole_1'}}})
    const container = screen.queryByTestId('pole-detail-footer')
    expect(container).toBeInTheDocument()
})

describe('content child rendering', () =>{
    describe('when poleReducer is a blank array or not passed', () =>{
        test('pole name should be blank', ()=>{
            compSetup({}, { match : { params : { poleId : 'pole_1'}}})
            const poleName = screen.queryByTestId('pole-detail-pole-name')
            expect(poleName).toHaveTextContent('')
        })
        test('content should have no question', ()=>{
            compSetup({}, { match : { params : { poleId : 'pole_1'}}})
            const questionNode = screen.queryAllByTestId('pole-detail-question')
            expect(questionNode).toHaveLength(0)
        })
        test('content should have no option', ()=>{
            compSetup({}, { match : { params : { poleId : 'pole_1'}}})
            const optionNode = screen.queryAllByTestId('pole-detail-option')
            expect(optionNode).toHaveLength(0)
        })
    })
    describe('when poleReducer is not a blank array', () =>{
        const pole = list?.find(pol => pol?.pole_id === 'pole_1') || {} 
        test('pole name should not be blank', ()=>{
            compSetup({poleReducer : list}, { match : { params : { poleId : 'pole_1'}}})
            const poleName = screen.queryByTestId('pole-detail-pole-name')
            expect(poleName).toHaveTextContent(pole?.pole_name)
        })
        test('content should have question', ()=>{
            compSetup({ poleReducer : list }, { match : { params : { poleId : 'pole_1'}}})
            const quesLength = pole?.questions?.length || 0
            const questionNode = screen.queryAllByTestId('pole-detail-question')
            expect(questionNode).toHaveLength(quesLength)
        })
        test('content should have options', ()=>{
            compSetup({ poleReducer : list }, { match : { params : { poleId : 'pole_1'}}})
            const optionsLength = pole?.questions?.map(res => res?.options?.length)?.reduce((currVal, currIndexVal)=> currVal + currIndexVal, 0)
            const optionNode = screen.queryAllByTestId('pole-detail-option')
            expect(optionNode).toHaveLength(optionsLength)
        })
    })
    describe('pointerEvent style of option container', () =>{
        test('when role is user or default case pointerEvent style should be absent', ()=>{
            compSetup({ poleReducer : list, loggedUserReducer : { role : USER } }, { match : { params : { poleId : 'pole_1'}}})
            const optionContainer = screen.queryAllByTestId('option-container')
            expect(optionContainer[0]).not.toHaveStyle('pointer-events:none')
        })
        test('when role is admin then pointerEvent style should be none', ()=>{
            compSetup({ poleReducer : list, loggedUserReducer : { role : ADMIN } }, { match : { params : { poleId : 'pole_1'}}})
            const optionContainer = screen.queryAllByTestId('option-container')
            expect(optionContainer[0]).toHaveStyle('pointer-events:none')
        })
    })
})

describe('footer child rendering', () =>{

    describe('with unattempted questions',()=>{
        test('by default save button should be disabled',() =>{
            compSetup({ poleReducer : list },{ match : { params : { poleId : 'pole_1'}}})
            const saveButton = screen.queryByTestId('pole-detail-save')
            expect(saveButton).toHaveAttribute('disabled', '') // for false disabled != ""
        })
        test('cancel button should be enabled',() =>{
            compSetup({ poleReducer : list },{ match : { params : { poleId : 'pole_1'}}})
            const cancelButton = screen.queryByTestId('pole-detail-cancel')
            expect(cancelButton).not.toHaveAttribute('disabled', '') // for false disabled != ""
        })
    })

    describe('with attempted questions', ()=>{
        const modifiedList = [
            { 
                ...list[0], 
                questions : list[0].questions.map(question => ({ ...question, optVal : 'option_1'}))
            }, 
            { 
                ...list[1]
            }
        ]
        test('save button should be enabled when all question has some option selected',() =>{
            compSetup({ poleReducer : modifiedList },{ match : { params : { poleId : 'pole_1'}}})
            const saveButton = screen.queryByTestId('pole-detail-save')
            expect(saveButton).not.toHaveAttribute('disabled', '') // for true disabled = ""
        })
        test('cancel button should be enabled',() =>{
            compSetup({ poleReducer : list },{ match : { params : { poleId : 'pole_1'}}})
            const cancelButton = screen.queryByTestId('pole-detail-cancel')
            expect(cancelButton).not.toHaveAttribute('disabled', '') // for fale disabled != ""
        })
    })
})