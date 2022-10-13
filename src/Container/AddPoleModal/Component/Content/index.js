
import React from 'react'
import { InputBox, Row, Col } from '../../../../Component'
import './index.css'

const Content = props =>{

    const onChange = () =>{

    }

    const questionsArr = [
        {
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
            }
    ]

    return(
        <React.Fragment>
            <InputBox
                label = ''
                name = "password"
                type ="password"
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
                                    name = "password"
                                    type ="password"
                                    placeholder = "Question"
                                    inputWidth = "calc(100% - 110px)"
                                    width ="100%"
                                    labelStyle = {{
                                        fontWeight : '600',
                                        fontSize : '15px'
                                    }}
                                    marginTop = "0px"
                                    onChange={onChange}
                                /> 
                                <Row className='option-row' gutter={[60, 0]}>
                                    {
                                        options?.map(({ option, id}, index)=>(
                                        <Col
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
                                                name = "password"
                                                type ="password"
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
                                </Row>
                            </React.Fragment>
                        ))
                    } 
     
            </div> : null
            }
        </React.Fragment>
    )
}

export default Content