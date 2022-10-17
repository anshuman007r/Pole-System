
import React, { useMemo, useState, useEffect} from 'react'
import { InputBox, Row, Col, Button } from '../../../../Component'
import './index.css'
import poleData from './addPole.json'
import questJSON from './quest.json'

const Content = props =>{
    // Object.freeze(poleData)
    const [ state, setState ] = useState(Object.assign({},{ ...poleData}))
    const { questions } = useMemo(()=>(state), [state])
    const [disableAddQues, setDisableAddQues] = useState(true)

    useEffect(()=>{
        const emptyQuest = questions?.filter(ques => !ques?.question || ques?.options?.find(opt => !opt?.option))
        setDisableAddQues(emptyQuest?.length ? true : false)
    },[questions])
    

    const isDisableAddOpt = (quesIndex = 0) =>{
        const question = { ...questions[quesIndex]}
        const { options = []} = question || {}
        const emptyOption = options?.filter(opt => !opt?.option)
        return emptyOption?.length ? true : false
    }

    const onChange = ({ target }, quesIndex = -1, poleIndex = -1) =>{
        const { value = ''} = target || {}
        if(quesIndex === -1){
            setState(prevState => ( { ...prevState, pole_name : value || ''}))
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
             options = [ ...options, { option_id : `option_${options?.length}`, option : '', vote : '' }]
            questions[quesIndex].options = options
            return {
                ...prevState,
                questions
            }
        })
    }

    const onAddQuestion = () =>{
        setState(prevState => ({ ...prevState, questions: [ ...prevState?.questions, { ...questJSON, question_id : `question_${prevState?.questions?.length}` }  ]}))
    }

    // console.log('#questions', questions, dataFPole)

    return(
        <React.Fragment>
            <InputBox
                label = ''
                name = "pole_name"
                placeholder = "Pole Name"
                inputWidth = "100%"
                width ="100%"
                marginTop = "0px"
                onChange={onChange}
                />
            <hr className='horizontal-line'/>
            {
                questions?.length ? 
                <div style={{  overflow : 'auto', height : 'calc(56vh - 135px)', padding : '0 12px'}}>
                    {
                        questions?.map(({question, options}, quesIndex)=>(
                            <React.Fragment>
                                { quesIndex ? <hr className='horizontal-line-internal'/> : null}
                                <InputBox
                                    label = {`Question ${quesIndex + 1}`}
                                    key={`Question_${quesIndex}`}
                                    name = {`question_${quesIndex}`}
                                    placeholder = "Question"
                                    inputWidth = "calc(100% - 110px)"
                                    width ="100%"
                                    labelStyle = {{
                                        fontWeight : '500',
                                        fontSize : '15px'
                                    }}
                                    marginTop = "0px"
                                    onChange={(event)=>onChange(event, quesIndex)}
                                /> 
                                <Row key={`option_containergit_${quesIndex}`} className='option-row' gutter={[60, 0]}>
                                    {
                                        options?.map(({ option, id}, index)=>(
                                        <Col
                                            // key={`option_${index}`}
                                            className='option-row-left-col'
                                            key={id || `option_${index}`}
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
                                        <div style={{ width : '100%',marginTop : '34px', display : 'flex', alignItems : 'center', justifyContent : 'flex-start'}}>
                                            <Button disabled={isDisableAddOpt(quesIndex)} type = "link" className = "content-button button-font-12px" onClick={() => onAddOption(quesIndex)}>+ Add option</Button>
                                        </div>
                                    </Col>    
                                </Row>
                            </React.Fragment>
                        ))
                    } 
                <div style={{ width : '100%',marginTop : '30px', display : 'flex', alignItems : 'center', justifyContent : 'flex-end'}}>
                    <Button disabled={disableAddQues} type = "link" className = "content-button button-font-16px" onClick={onAddQuestion}>+ Add question</Button>
                </div>
            </div> : null
            }
        </React.Fragment>
    )
}

export default Content