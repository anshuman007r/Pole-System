
import React from 'react'
import { InputBox, Row, Col, Button } from '../../../../Component'
import './index.css'

const Content = props =>{

    const onChange = () =>{

    }

    const questionsArr = [
        {
        question_id : '',
        question : '',
        options : [
            {
                id : '',
                option : '',
                vote : ''
            },
            {
                id : '',
                option : '',
                vote : ''
            },
            {
                id : '',
                option : '',
                vote : ''
            },
            {
                id : '',
                option : '',
                vote : ''
            }
        ]
        },
        {
            question_id : '',
            question : '',
            options : [
                // {
                //     id : '',
                //     option : '',
                //     vote : ''
                // },
                {
                    id : '',
                    option : '',
                    vote : ''
                },
                {
                    id : '',
                    option : '',
                    vote : ''
                },
                {
                    id : '',
                    option : '',
                    vote : ''
                }
            ]
            }
    ]

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
                questionsArr?.length ? 
                <div style={{  overflow : 'auto', height : 'calc(56vh - 135px)', padding : '0 12px'}}>
                    {
                        questionsArr?.map(({question, options}, quesIndex)=>(
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
                                    onChange={onChange}
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
                                                onChange={onChange}
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
                                            <Button type = "link" className = "content-button button-font-12px">+ Add option</Button>
                                        </div>
                                    </Col>    
                                </Row>
                            </React.Fragment>
                        ))
                    } 
                <div style={{ width : '100%',marginTop : '30px', display : 'flex', alignItems : 'center', justifyContent : 'flex-end'}}>
                    <Button type = "link" className = "content-button button-font-16px">+ Add question</Button>
                </div>
            </div> : null
            }
        </React.Fragment>
    )
}

export default Content