import React, { useMemo } from "react";
import { Header, Typography, Row, Col, Tooltip } from "../../Component";
import { useSelector } from "react-redux";
import './index.css'
import PieChart from "echarts-for-react";
import 'echarts/lib/component/tooltip'
import moment from "moment";
import constants from "../../Constants";
const { POLE_RESULT } = constants
const colorOpt = ['#1D8348','#9C640C','#9B59B6', '#A93226', '#D2B4DE', '#2471A3', '#5DADE2', '#0E6655', '#F4D03F', '#F39C12', '#935116', '#D35400', '#B3B6B7', '#626567', '#D5DBDB', '#FAD7A0']

const getRandomColorSet = (options = []) => {
  const colorArr= [] 
  for(let index = 0; index <options?.length; index++){
    const randomNum = (Math.round(Math.random(moment().valueOf())*moment().valueOf())) 
    const modOfNum = randomNum % 16
    const color = colorOpt[modOfNum]
    const checkExistence = colorArr?.find(col => col === color)
    if(!checkExistence) colorArr.push(color)
    else{
      const num = (modOfNum + 2) % 16
      colorArr.push(colorOpt[num])
    }
  }
  return colorArr
}

const PoleResult = props => {
    const { match : { params : { poleId }}} = props
    const { poleReducer : poles } = useSelector(state => state)
    const pole = useMemo(() =>poles?.find(pol => pol?.pole_id === poleId), [poles, poleId])
    
    const getOption = (options, question) => ({
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          left: "left",
          data: options?.map((opt, index) => opt?.option || index)
        },
        series: [
          {
            name: question || '',
            type: "pie",
            radius: "65%",
            center: ["40%", "50%"],
            animationDuration: 5000,
            data: options?.map((opt, index) => ({ name : opt?.option || index, value : opt?.vote || 0})),
            color : getRandomColorSet(options),
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
                page = {POLE_RESULT}
                { ...props}
            />
            <div data-testid="pole-result-content" className="pole-detail-container">
                <div className="sub-header">
                    <img alt= "pole_image" src= {process.env.PUBLIC_URL+"images/pole_image.png"} width = "50px" height = "50px"/>
                    <Tooltip title={pole?.pole_name || ''} placement= 'bottomLeft'>
                       <Typography.Title className="sub-header-text label-ellipsis-pole-details">{pole?.pole_name || ''}</Typography.Title>
                    </Tooltip>
                </div>
                <hr className='horizontal-line-pole_detail' />
                {
                    pole?.questions?.length ? 
                    <div className="pole-container">
                        <Row key={`option_containergit_${pole?.pole_id || ''}`} className='option-row' gutter={[60, 10]}>
                        {
                            pole?.questions?.map(({question, options, question_id}, quesIndex)=>(
                                <React.Fragment key={`react_frag_${quesIndex}`}>
                                    <Col
                                        // key={`option_${index}`}
                                        className='option-row-left-col'
                                        key= {question_id|| `option_${quesIndex}`}
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
                                      <Tooltip title={question || ''} placement= 'bottomLeft'>
                                          <Typography.Paragraph className="pole-detail-ques label-ellipsis-pole-details">{question || ''}</Typography.Paragraph>
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
            </div>    
        </>
    )
}

export default PoleResult