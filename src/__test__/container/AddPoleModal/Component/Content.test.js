import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { RouterWrapper, StoreWrapper, ModalContent } from '../../../../Container';
import constants from '../../../../Constants';
import { storeFactory, getUniqueNumber } from '../../../../helper';

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

const poleMockData = {
    "pole_id" : `pole_${getUniqueNumber()}`,
    "pole_name" : "Test pole",
    "visted_by_user" : "0",
    "closing_date" : '',
    "questions" : [
        {
            "question_id" : `question_${getUniqueNumber()}`,
            "question" : "Test question",
            "question_visited" : "",
            "options" : [
                {
                    "option_id" : `option_${getUniqueNumber()}`,
                    "option" : "opt 1",
                    "vote" : "" 
                },
                {
                    "option_id" : `option_${getUniqueNumber()}`,
                    "option" : "opt 2",
                    "vote" : "" 
                }
            ]
        }
    ]
} 


test('component should render without error', () =>{
    compSetup({},{})
    const modalContainer = screen.queryByTestId('modal-content')
    expect(modalContainer).toBeInTheDocument()
})

describe('rendering of content', () =>{
    describe('by default',()=>{
        test('add option should be disabled',()=>{
            compSetup({},{})
            const modalAddQues = screen.queryByTestId('modal-add-option')
            expect(modalAddQues).toBeDisabled()
        })
        test('add question should be disabled',()=>{
            compSetup({},{})
            const modalAddOption = screen.queryByTestId('modal-add-question')
            expect(modalAddOption).toBeDisabled()
        })
        test('pole name should be empty', () =>{
            compSetup({},{})
            const poleName = screen.queryByTestId('pole_name')
            expect(poleName.value).toBe('')
        })
        test('questions should be empty', () =>{
            compSetup({},{})
            const questionNode = screen.queryAllByTestId('question')
            const questionMockValueArr = questionNode?.map(()=>'')
            const questionValueArr = questionNode?.map(ques => ques.getAttribute('value'))
            expect(questionValueArr).toStrictEqual(questionMockValueArr)
        })
        test('options should be empty', () =>{
            compSetup({},{})
            const optionNode = screen.queryAllByTestId('option')
            const optionMockValueArr = optionNode?.map(()=>'')
            const optionValueArr = optionNode?.map(opt => opt.getAttribute('value'))
            expect(optionValueArr).toStrictEqual(optionMockValueArr)
        })
    })
    describe('when filling options',() =>{
        beforeEach(async ()=>{
            compSetup({},{})
            const optionsNode = screen.queryAllByTestId('option')
            for await (const node of optionsNode){          
                fireEvent.change(node, { target : { value : 'opt'} })
            }
        })
        test('add option should be enabled',()=>{
            const modalAddQues = screen.queryByTestId('modal-add-option')
            expect(modalAddQues).not.toBeDisabled()
        })
        test('add question should be disabled',()=>{
            const modalAddOption = screen.queryByTestId('modal-add-question')
            expect(modalAddOption).toBeDisabled()
        }) 
    })
    describe('when options and question is filled',() =>{
        beforeEach(async ()=>{
            compSetup({},{})
            const questionNode = screen.queryAllByTestId('question')
            for await (const node of questionNode){          
                fireEvent.change(node, { target : { value : 'ques'} })
            }
            const optionsNode = screen.queryAllByTestId('option')
            for await (const node of optionsNode){          
                fireEvent.change(node, { target : { value : 'opt'} })
            }
        })
        test('add option should be enabled',()=>{
            const modalAddQues = screen.queryByTestId('modal-add-option')
            expect(modalAddQues).not.toBeDisabled()
        })
        test('add question should be enabled',()=>{
            const modalAddOption = screen.queryByTestId('modal-add-question')
            expect(modalAddOption).not.toBeDisabled()
        }) 
    })
    describe('when passing poleData as props/edit mode',() =>{
        beforeEach(async ()=>{
            compSetup({},{ pole : poleMockData})
        })
        test('add option should be enabled',()=>{
            const modalAddQues = screen.queryByTestId('modal-add-option')
            expect(modalAddQues).not.toBeDisabled()
        })
        test('add question should be enabled',()=>{
            const modalAddOption = screen.queryByTestId('modal-add-question')
            expect(modalAddOption).not.toBeDisabled()
        }) 
        test('pole name should contain value present in poleMockData',()=>{
            const poleName = screen.queryByTestId('pole_name')
            expect(poleName.value).toBe(poleMockData?.pole_name)
        })
        test('question field should contain the question value present in poleMockData', ()=>{
            const questionNode = screen.queryAllByTestId('question')
            const quesValueArr = questionNode?.map(o => o.getAttribute('value'))
            const mockquestArr = poleMockData?.questions?.map(ques => ques?.question)
            expect(mockquestArr).toStrictEqual(quesValueArr)
        })
        test('option field should contain the question value present in poleMockData', ()=>{
            const optionNode = screen.queryAllByTestId('option')
            const optionValueArr = optionNode?.map(o => o.getAttribute('value'))
            const mockoptionArr = poleMockData?.questions
                                  ?.map(ques => ques?.options?.map(opt =>opt?.option))
                                  ?.reduce((currValue, currIndexValue)=> currValue.concat(currIndexValue),[])
            expect(mockoptionArr).toStrictEqual(optionValueArr)
        })
    })
})
