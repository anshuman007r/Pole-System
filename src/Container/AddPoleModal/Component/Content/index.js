
import React, { useMemo, useState, useEffect, useImperativeHandle, forwardRef} from 'react'
import { InputBox, Row, Col, Button, DatePicker } from '../../../../Component'
import './index.css'
import moment from 'moment'
// import poleData from './addPole.json'
// import questJSON from './quest.json'

const getUniqueNumber = ()=>{
    return Math.random(moment()?.valueOf())*moment().valueOf()
}

// const autoExpireGen = () => {
//     return moment().add(5, 'days').format('YYYY/MM/DD')
// }

const Content = (props, ref) =>{
    const poleData = {
        "pole_id" : `pole_${getUniqueNumber()}`,
        "pole_name" : "",
        "visted_by_user" : "0",
        "closing_date" : '',
        "questions" : [
            {
                "question_id" : `question_${getUniqueNumber()}`,
                "question" : "",
                "question_visited" : "",
                "options" : [
                    {
                        "option_id" : `option_${getUniqueNumber()}`,
                        "option" : "",
                        "vote" : "" 
                    },
                    {
                        "option_id" : `option_${getUniqueNumber()}`,
                        "option" : "",
                        "vote" : "" 
                    }
                ]
            }
        ]
    } 
    
    const questJSON = {
        "question_id" : "ques_1",
        "question" : "",
        "question_visited" : "",
        "options" : [
            {
                "option_id" : "option_1",
                "option" : "",
                "vote" : "" 
            },
            {
                "option_id" : "option_2",
                "option" : "",
                "vote" : "" 
            }
        ]
    }
    const { onDisableAdd = () => {}, pole = '' } =  props
    const [ state, setState ] = useState(pole || { ...poleData})
    const { questions, pole_name = '' } = useMemo(()=>(state), [state])
    const [disableAddQues, setDisableAddQues] = useState(true)

    useEffect(()=>{
        const { questions : queses, pole_name : nameFPole} = state || {}
        const emptyQuest = queses?.filter(ques => !ques?.question || ques?.options?.find(opt => !opt?.option))
        const isDisableAddQuest = emptyQuest?.length ? true : false
        setDisableAddQues(isDisableAddQuest)
        onDisableAdd( !nameFPole || isDisableAddQuest)
    },[state, onDisableAdd])


    const isDisableAddOpt = (quesIndex = 0) =>{
        const question = { ...questions[quesIndex]}
        const { options = []} = question || {}
        const emptyOption = options?.filter(opt => !opt?.option)
        return emptyOption?.length ? true : false
    }

    const onChange = ({ target }, quesIndex = -1, poleIndex = -1) =>{
        const { value = '', name = ''} = target || {}
        if(quesIndex === -1){
            setState(prevState => ( { ...prevState, [name] : value || ''}))
        }else if( poleIndex === -1){
            setState(prevState=>{
                let { questions = []} = prevState
                questions[quesIndex] = { ...questions[quesIndex], question : value || ''}
                return {
                    ...prevState,
                    questions
                }
            })
        }else {
            setState(prevState=>{
                let { questions = []} = prevState
                let { options = [] } = questions?.[quesIndex] || {} 
                options[poleIndex] = { ...options[poleIndex], option  : value || ''}
                questions[quesIndex] = { ...questions[quesIndex], options}
                return {
                    ...prevState,
                    questions : [ ...questions ]
                }
            })         
        }
    }

    const onAddOption = (quesIndex) =>{
        setState(prevState => {
            const { questions = []} = prevState || {}
            let { options = []} = questions[quesIndex]
             options = [ ...options, { option_id : `option_${getUniqueNumber()}`, option : '', vote : '' }]
            questions[quesIndex].options = options
            return {
                ...prevState,
                questions
            }
        })
    }

    const onAddQuestion = () =>{
        setState(prevState => ({ ...prevState, questions: [ ...prevState?.questions, { ...questJSON, question_id : `question_${getUniqueNumber()}` }  ]}))
    }

    const onDeleteClick = ({question_id = '', option_id = ''}) =>{
        // console.log('#param', question_id, option_id, questions?.filter(ques => ques?.question_id !== question_id))
        if(!option_id){
            setState(prevState => {
                const questions =  prevState?.questions?.filter(ques => ques?.question_id !== question_id) || []
                // console.log('#ques', questions)
                 return{
                    ...prevState, 
                    questions
                 }
            })
        }else{
            setState(prevState=>{
                let { questions } = prevState
                let questionIndex = questions?.findIndex(ques => ques?.question_id === question_id)
                if(questionIndex !== -1){
                    let { options = [] } = questions[questionIndex]  || {}
                    options = options?.filter(opt => opt?.option_id !== option_id) || []
                    questions[questionIndex] = { ...questions[questionIndex], options}
                    return { 
                        ...prevState,
                        questions
                    }
                }
            })
        }
    }

    useImperativeHandle( ref, ()=> ({
        poleData : state
    }))

    return(
        <React.Fragment>
            <InputBox
                label = ''
                name = "pole_name"
                placeholder = "Pole Name"
                inputWidth = "100%"
                value={pole_name || ''}
                width ="100%"
                marginTop = "0px"
                onChange={onChange}
                />
                <DatePicker
                    label = 'Closing Date'
                    name = "closing_date"
                    width = "40%"
                    labelStyle = {{
                        fontWeight : '500',
                        fontSize : '15px',
                        padding : '0 12px'
                    }}
                    value={ state?.closing_date ? moment(state?.closing_date , 'YYYY/MM/DD') : ''}
                    onChange={(date)=>onChange({ target : { name : 'closing_date', value : date ? moment(date)?.format('YYYY/MM/DD') : '' }})}
                    inputWidth = "calc(100% - 140px)"

                />
            <hr className='horizontal-line'/>
            {
                questions?.length ? 
                <div className='question-container'>
                    {
                        questions?.map(({question, options, question_id}, quesIndex)=>(
                            <React.Fragment>
                                { quesIndex ? <hr key={`hr_${question_id}`}  className='horizontal-line-internal'/> : null}
                                <InputBox
                                    label = {`Question ${quesIndex + 1}`}
                                    key={question_id || `Question_${quesIndex}`}
                                    name = {question_id || `question_${quesIndex}`}
                                    quesIndex = {quesIndex}
                                    value={question || ''}
                                    disableDelIcon = {questions?.length > 1 ? false : true}
                                    deleteParams={{ question_id }}
                                    placeholder = "Question"
                                    inputWidth = "calc(100% - 110px)"
                                    width ="100%"
                                    labelStyle = {{
                                        fontWeight : '500',
                                        fontSize : '15px'
                                    }}
                                    showDelIcon
                                    onDeleteClick={onDeleteClick}
                                    marginTop = "0px"
                                    onChange={(event)=>onChange(event, quesIndex)}
                                /> 
                                <Row key={`option_containergit_${question_id || quesIndex}`} className='option-row' gutter={[60, 0]}>
                                    {
                                        options?.map(({ option, option_id}, index)=>(
                                        <Col
                                            // key={`option_${index}`}
                                            className='option-row-left-col'
                                            key= {option_id || `option_${index}`}
                                            xs={{
                                                span: 12,
                                                // offset: 1,
                                            }}
                                            lg={{
                                                span: 12,
                                                // offset: 1,
                                            }}
                                        >
                                            <InputBox
                                                label = {`Option ${index + 1}`}
                                                name = {`option_${index}`}
                                                // type ="password"
                                                quesIndex = {quesIndex}
                                                disableDelIcon = {options?.length > 2 ? false : true}
                                                deleteParams={{ question_id, option_id }}
                                                optIndex = {index}
                                                value={option || ''}
                                                showDelIcon 
                                                onDeleteClick={onDeleteClick}
                                                placeholder = "Option"
                                                inputWidth = "calc(100% - 120px)"
                                                width ="100%"
                                                labelStyle= {{
                                                    fontSize : '12px'
                                                }}
                                                // // marginTop = "0px"
                                                onChange={(event)=>onChange(event, quesIndex, index)}
                                            />
                                        </Col>              
                                        ))
                                    }
                                    <Col
                                        // key={`option_${index}`}
                                        className= {'option-row-left-col'}
                                        key={`option_add`}
                                        xs={{
                                            span: 12,
                                            // offset: 1,
                                        }}
                                        lg={{
                                            span: 12,
                                            // offset: 1,
                                        }}
                                    >
                                        <div className='add-opt-container'>
                                            <Button disabled={isDisableAddOpt(quesIndex)} type = "link" className = "content-button button-font-12px" onClick={() => onAddOption(quesIndex)}>+ Add option</Button>
                                        </div>
                                    </Col>    
                                </Row>
                            </React.Fragment>
                        ))
                    } 
                <div className='add-ques-container'>
                    <Button disabled={disableAddQues} type = "link" className = "content-button button-font-16px" onClick={onAddQuestion}>+ Add question</Button>
                </div>
            </div> : null
            }
        </React.Fragment>
    )
}


export default forwardRef(Content)