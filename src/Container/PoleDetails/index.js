import React, { useEffect, useMemo, useState } from "react";
import { Header, Typography, Button, Row, Col, RadioBox, Tooltip } from "../../Component";
import { useSelector, useDispatch } from "react-redux";
import './index.css'
import { ModifyPole } from "../../storage/action";
import constants from "../../Constants";
const { 
    POLE_DETAILS,
    CANCEL,
    SAVE,
    ADMIN
} = constants

const PoleDetails = props => {
    const { match : { params : { poleId }}} = props
    const dispatch = useDispatch()
    const [disableSave, setDisableSave] = useState(true)
    const [quesArr, setQuesArr] = useState([])
    const { poleReducer : poles, loggedUserReducer : loggedUser } = useSelector(state => state)
    const pole = useMemo(() =>poles?.find(pol => pol?.pole_id === poleId), [poles, poleId])
    const  role  = useMemo(()=> loggedUser?.role || 'user', [loggedUser])
    Object.freeze(poles)


    useEffect(()=>{
        const checkForUnAttempQues = quesArr?.find(qu => !qu?.optVal)
        setDisableSave(checkForUnAttempQues ? true : false)
    },[quesArr])

    useEffect(()=>{
        setQuesArr(pole?.questions?.map(ques =>({ question : ques?.question, optVal : ques?.optVal || ''})))
    },[pole])

    const onSave = () => {
        // console.log(pole, quesArr)
        let poleIndex = poles?.findIndex(pol => pol?.pole_id  === poleId)
        const poleCpy = poleIndex !== -1 ? { ...poles?.[poleIndex] }  : {}
        let { questions } = poleCpy
        const questionArr = questions?.map((qu, index) => {
            let { options = [] } = qu
            const optIndex = options?.findIndex(op => op?.option === quesArr?.[index]?.optVal)
            if(optIndex !== -1){
                options[optIndex] = { ...options[optIndex], vote : options[optIndex]?.vote ? options[optIndex]?.vote + 1 : 1 }
            }
            return { 
                ...qu,
                options : [ ...options]
            }
        })
        const updatedPole = { 
            ...poleCpy, 
            visited_by_user : Array.isArray(poleCpy?.visited_by_user) ? [ ...poleCpy?.visited_by_user, loggedUser?.userName ] : [ loggedUser?.userName ], 
            questions : [ ...questionArr]
        }
        // console.log(poles, updatedPole)
        dispatch(ModifyPole({ updatedPole, poleIndex }))
        onCancel()
        // dispatch(ModifyPole(updatedPoles))
    }

    const onChange = (question = '', { target = {} }) => {
        const { value = ''} = target
        setQuesArr(prevState =>{
            const question_index = prevState?.findIndex(qu => qu?.question === question)
            if(question_index !== -1){
                prevState[question_index] = { ...prevState[question_index], optVal : value}
                return [ ...prevState]
            }
        })
    }

    const onCancel = () =>{
        props.history?.goBack()
    }

    return (
        <>
            <Header
                page = {POLE_DETAILS}
                { ...props}
            />
            <div data-testid="pole-detail-content" className="pole-detail-container">
                <div className="sub-header">
                    <img alt= "pole_image" src= {process.env.PUBLIC_URL+"images/pole_image.png"} width = "50px" height = "50px"/>
                    <Tooltip title={pole?.pole_name || ''} placement= 'bottomLeft'>
                       <Typography.Title data-testid="pole-detail-pole-name" className="sub-header-text label-ellipsis-pole-details">{pole?.pole_name || ''}</Typography.Title>
                    </Tooltip>
                </div>
                <hr className='horizontal-line-pole_detail' />
                {
                    pole?.questions?.length ? 
                    <div style={{  overflow : 'auto', height : 'calc(100vh - 251px)'}}>
                        {
                            pole?.questions?.map(({question, options, question_id}, quesIndex)=>(
                                <div data-testid = "pole-detail-question" key={`react_frag_${quesIndex}`}>
                                    { quesIndex ? <hr key={`hr_${question_id}`}  className='horizontal-line-internal'/> : null}
                                    <Tooltip title={question || ''} placement= 'bottomLeft'>
                                        <Typography.Paragraph className="pole-detail-ques label-ellipsis-pole-details">{question || ''}</Typography.Paragraph>
                                    </Tooltip>
                                    <Row data-testid="option-container" key={`option_containergit_${question_id || quesIndex}`} className='option-row' gutter={[60, 10]} style={{ pointerEvents : role === 'admin' ? 'none' : ''}}>
                                            {
                                                options?.map(({ option, option_id}, index)=>(
                                                <Col
                                                    // key={`option_${index}`}
                                                    data-testid = "pole-detail-option"
                                                    className='option-row-left-col'
                                                    key= {option_id || `option_${index}`}
                                                    sm = {{
                                                        span : 24
                                                      }}
                                                    md = {{
                                                        span : 12
                                                    }}
                                                    xs={{
                                                        span: 24,
                                                        // offset: 1,
                                                    }}
                                                    lg={{
                                                        span: 12,
                                                        // offset: 1,
                                                    }}
                                                >
                                                    <RadioBox
                                                        key= {`radio_${index}`}
                                                        checked = {quesArr?.[quesIndex]?.optVal === option ? true  : false}
                                                        value = {option}
                                                        label= {option}
                                                        onClick={(event) => onChange(question, event)}
                                                    />
                                                </Col>              
                                                ))
                                            }
                                    </Row>
                                </div>
                            ))
                        }    
                    </div> : null
                }   
            </div> 
            <div data-testid="pole-detail-footer" className="pole-detail-footer">
                <Button data-testid = "pole-detail-cancel" type = "link" className = "content-button button-font-16px" onClick={onCancel}>{CANCEL}</Button>
                <Button data-testid = "pole-detail-save" disabled={disableSave} type = "primary" className = " save-button-pole button-font-16px" onClick={onSave}>{SAVE}</Button>
            </div>     
        </>
    )
}

export default PoleDetails