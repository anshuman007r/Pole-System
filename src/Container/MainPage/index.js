import React from 'react'
// import { PageHeader } from 'antd'
import './index.css'
import { useDispatch } from 'react-redux';
import { Header, Typography } from '../../Component';
import { LogOutUser } from '../../storage/action';

const MainPage = props => {
    const dispatch = useDispatch()

    const onLogoutClick = () =>{
        dispatch(LogOutUser())
    }

    return(
        <div style={{ content : 'block'}}>
            <Header
                onLogoutClick={onLogoutClick}
            />
            <div className='mainpage-content'>
                <img alt= "pole_image" src= {process.env.PUBLIC_URL+"images/pole_image.png"} width = "316px" height = "316px"/>
                <Typography.Title className='is-capitalized has-text-weight-normal mainpage-label'>Welcome back Admin</Typography.Title>
            </div>

        </div>
    )
}

export default MainPage