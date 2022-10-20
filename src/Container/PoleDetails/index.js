import React, { useMemo } from "react";
import { Header, Typography, Button, Row, Col, InputBox, RadioBox, RadioGroup } from "../../Component";
import { useSelector } from "react-redux";
import './index.css'
import Tooltip from "antd/es/tooltip";

const PoleDetails = props => {
    const { match : { params : { poleId }}} = props
    const { poleReducer : poles, loggedUserReducer : loggedUser } = useSelector(state => state)
    const pole = useMemo(() =>poles?.find(pol => pol?.pole_id === poleId), [poles, poleId])
    const  role  = useMemo(()=> loggedUser?.role || 'user', [loggedUser])
    return (
        <>
            <Header
                page = "Pole Details"
                { ...props}
            />
            <div className="pole-detail-container">
                <div className="sub-header">
                    <img alt= "pole_image" src= {process.env.PUBLIC_URL+"images/pole_image.png"} width = "50px" height = "50px"/>
                    <Tooltip title={pole?.pole_name || ''} placement= 'bottomLeft'>
                       <Typography.Title className="sub-header-text label-ellipsis-pole-details">{pole?.pole_name || ''}</Typography.Title>
                    </Tooltip>
                </div>
                <hr className='horizontal-line-pole_detail' />
                {
                    pole?.questions?.length ? 
                    <div style={{  overflow : 'auto', height : 'calc(100vh - 235px)'}}>
                        {
                            pole?.questions?.map(({question, options, question_id}, quesIndex)=>(
                                <React.Fragment>
                                    { quesIndex ? <hr key={`hr_${question_id}`}  className='horizontal-line-internal'/> : null}
                                    <Tooltip title={question || ''} placement= 'bottomLeft'>
                                        <Typography.Paragraph className="pole-detail-ques label-ellipsis-pole-details">{question || ''}</Typography.Paragraph>
                                    </Tooltip>
                                    <Row key={`option_containergit_${question_id || quesIndex}`} className='option-row' gutter={[60, 10]} style={{ pointerEvents : role === 'admin' ? 'none' : ''}}>
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
                                                    <RadioBox
                                                        value = "1"
                                                        label= {option}
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
                <div className="pole-detail-footer" style={{ pointerEvents : role === 'admin' ? 'none' : ''}}>
                    <Button disabled={false} type = "link" className = "content-button button-font-16px" onClick={console.log}>Cancel</Button>
                    <Button disabled={false} type = "primary" className = " save-button-pole button-font-16px" onClick={console.log}>Save</Button>
                </div>   
            </div>    
        </>
    )
}

export default PoleDetails