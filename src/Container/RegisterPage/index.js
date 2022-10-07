import React from 'react'
import { Link } from 'react-router-dom'
import { InputBox, Typography, Button, SelectBox} from '../../Component'
import './index.css'
// import { useDispatch } from 'react-redux'
// import { LogInUser } from '../../storage/action'
const RegisterPage = props => {

    return(
        <div className='container-register'>
            <div className='content-register'>
                <Typography.Title style={{ color : '#0072E5'}}>Register</Typography.Title>
                <InputBox
                    label = 'First name' 
                />
                <InputBox
                    label = 'Last name' 
                />
                <InputBox
                    label = 'User name' 
                />
                <InputBox
                    label = 'Password'
                />
                <SelectBox
                    label = 'Role' 
                />
                <div style={{ width : '40%', display : 'flex'}}>
                    <Button type="primary"  style={{ background : '#0072E5', width : '120px', margin : '40px 0 0 0px'}}>Register</Button>
                </div>
                <Link to= "/login">
                    <Typography.Text ellipsis style={{color : '#0072E5', fontSize : '12px', marginTop : '5px'}}>
                        Already have an account? Go to login
                    </Typography.Text> 
                </Link> 
          
            </div>

        </div>
    )
}

export default RegisterPage