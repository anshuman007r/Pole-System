import React, { useMemo } from "react";
import { Header, Typography, Button, Row, Col, InputBox, RadioBox, RadioGroup } from "../../Component";
import { useSelector } from "react-redux";
import './index.css'
import Tooltip from "antd/es/tooltip";
import PieChart from "echarts-for-react";
import 'echarts/lib/component/tooltip'

const PoleResult = props => {
    const { match : { params : { poleId }}} = props
    const { poleReducer : poles, loggedUserReducer : loggedUser } = useSelector(state => state)
    const pole = useMemo(() =>poles?.find(pol => pol?.pole_id === poleId), [poles, poleId])
    const  role  = useMemo(()=> loggedUser?.role || 'user', [loggedUser])
    var colorPalette = ['#00b04f', '#ffbf00', '#ff0000', '#2e2e2e']
    const getOption = (options, question) => ({
        // title: {
        //   // text: "某站点用户访问来源",
        //   // subtext: "纯属虚构",
        //   x: "left"
        // },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          left: "left",
          data: [ ...options, ...options]?.map((opt, index) => `pole_${index}`)
        },
        series: [
          {
            name: question || '',
            type: "pie",
            radius: "65%",
            center: ["40%", "50%"],
            animationDuration: 5000,
            data: [ ...options, ...options]?.map((opt, index) => ({ name : `pole_${index}`, value : index + 1})),
            color : colorPalette,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });

    return (
        <>
            <Header
                page = "Pole Result"
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
                    <div style={{  overflow : 'auto', height : 'calc(100vh - 195px)'}}>
                        <Row key={`option_containergit_${pole?.pole_id || ''}`} className='option-row' gutter={[60, 10]} style={{ pointerEvents : role === 'admin' ? 'none' : ''}}>
                        {
                            [ ...pole?.questions, ...pole?.questions, ...pole?.questions]?.map(({question, options, question_id}, quesIndex)=>(
                                <React.Fragment>
                                    <Col
                                        // key={`option_${index}`}
                                        className='option-row-left-col'
                                        key= {question_id|| `option_${question_id}`}
                                        xs={{
                                            span: 12,
                                            // offset: 1,
                                        }}
                                        lg={{
                                            span: 12,
                                            // offset: 1,
                                        }}
                                    >
                                      <Tooltip title={question || ''} placement= 'bottomLeft'>
                                          <Typography.Paragraph className="pole-detail-ques label-ellipsis-pole-details">{'Who is your favourite team player ?'}</Typography.Paragraph>
                                      </Tooltip>
                                      <PieChart
                                          option={getOption(options, question)}
                                          style={{ height: "350px", width: "100%" }}
                                      />
                                    </Col>
                                </React.Fragment>
                            ))
                        }    
                        </Row>
                    </div> : null
                }  
                {/* <div className="pole-detail-footer" style={{ pointerEvents : role === 'admin' ? 'none' : ''}}>
                    <Button disabled={false} type = "link" className = "content-button button-font-16px" onClick={console.log}>Cancel</Button>
                    <Button disabled={false} type = "primary" className = " save-button-pole button-font-16px" onClick={console.log}>Save</Button>
                </div>    */}
            </div>    
        </>
    )
}

export default PoleResult