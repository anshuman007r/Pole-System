import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { InputBox, Typography, Button} from '../../Component'
import './index.css'
import { useDispatch } from 'react-redux'
import { LogInUser } from '../../storage/action'

const LoginPage = props => {
    const dispatch = useDispatch()

    const onLoginClick = () =>{
        dispatch(LogInUser({
            userName : 'Anshuman',
            password : 'welcome@123'
        }))
    }
    
    return(
        <div className='container-login'>
            <div className='content-login'>
                <Typography.Title style={{ color : '#0072E5'}}>Login</Typography.Title>
                <InputBox
                    label = 'User name' 
                    onChange = {console.log}
                />
                <InputBox
                    label = 'Password'
                />
                <div style={{ width : '40%', display : 'flex'}}>
                    <Button type="primary"  style={{ background : '#0072E5', width : '120px', margin : '40px 0 0 0px'}} onClick={onLoginClick}>Login</Button>
                </div>
                <Link to= "/register">
                    <Typography.Text ellipsis style={{color : '#0072E5', fontSize : '12px', marginTop : '5px'}}>
                        Don't have account? Click to register
                    </Typography.Text> 
                </Link> 
          
            </div>

        </div>
    )
}

export default LoginPage