import React, { useMemo} from 'react'
// import { PageHeader } from 'antd'
import './index.css'
import { Header, Typography, Tooltip } from '../../Component';
import { useSelector } from 'react-redux';

const emptyObject = (obj = {}) =>{
    return !( obj instanceof Object) || Object.keys(obj).length === 0
}

const MainPage = props => {
    const { loggedUserReducer : loggedUser } = useSelector( state => state)
    const label = useMemo(()=> !emptyObject(loggedUser) ? `Welcome back ${loggedUser?.firstName} ${loggedUser?.lastName} !` : '',[loggedUser])
    return(
        <div data-testid="main-page-container" style={{ content : 'block', overflow : 'auto'}}>
            <Header
                { ...props}
            />
            <div className='mainpage-content'>
                <img alt= "pole_image" src= {process.env.PUBLIC_URL+"images/pole_image.png"} width = "26%" height = "26%"/>
                {
                    label ? 
                    <Tooltip title={label || ''} placement= 'bottomLeft'>
                        <Typography.Title data-testid="image-label" className='is-capitalized has-text-weight-normal mainpage-label label-ellipsis-main'>{label || ''}</Typography.Title>
                    </Tooltip> : null
                }

            </div>

        </div>
    )
}

export default MainPage