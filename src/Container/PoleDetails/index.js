import React, { useMemo } from "react";
import { Header, Typography } from "../../Component";
import { useSelector } from "react-redux";
import './index.css'

const PoleDetails = props => {
    const { match : { params : { poleId }}} = props
    const { poleReducer : poles } = useSelector(state => state)
    const pole = useMemo(() =>poles?.find(pol => pol?.pole_id === poleId), [poles, poleId])

    return (
        <>
            <Header
                page = "Pole Details"
                { ...props}
            />
            <div className="pole-detail-container">
                <div className="sub-header">
                    <img alt= "pole_image" src= {process.env.PUBLIC_URL+"images/pole_image.png"} width = "50px" height = "50px"/>
                    <Typography.Title className="sub-header-text label-ellipsis-pole-details">{pole?.pole_name || ''}</Typography.Title>
                </div>
                <hr className='horizontal-line-pole_detail' />
            </div>            
        </>
    )
}

export default PoleDetails