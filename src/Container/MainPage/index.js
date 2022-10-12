import React from 'react'
// import { PageHeader } from 'antd'
import './index.css'
import { Header, Typography } from '../../Component';
import { useSelector } from 'react-redux';

const MainPage = props => {
    const { loggedUserReducer : loggedUser } = useSelector( state => state)
    return(
        <div style={{ content : 'block'}}>
            <Header
                { ...props}
            />
            <div className='mainpage-content'>
                <img alt= "pole_image" src= {process.env.PUBLIC_URL+"images/pole_image.png"} width = "316px" height = "316px"/>
                <Typography.Title className='is-capitalized has-text-weight-normal mainpage-label'>Welcome back {loggedUser?.firstName + ' ' + loggedUser?.lastName} !</Typography.Title>
            </div>

        </div>
    )
}

export default MainPage