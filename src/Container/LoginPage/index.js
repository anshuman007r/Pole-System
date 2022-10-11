import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InputBox, Typography, Button} from '../../Component'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { LogInUser } from '../../storage/action'

const LoginPage = props => {
    const [ state, setState] = useState({
        userName : '',
        password : ''
    })
    const [disableButton, setDisableButton] = useState(true) 
    const [error, setError] = useState('')
    const userDetails = useSelector(state => state?.usersReducer || [])
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log('#error', error)
        if(error) alert(`error:  ${error}`)
    },[error])

    useEffect(()=>{
        if(
            state?.userName 
            && state?.password
        ) setDisableButton(false)
        else setDisableButton(true)
    },[state])

    const onLoginClick = () =>{
        const userDetail = userDetails?.find(user => user?.userName === state?.userName)
        if(userDetail){
            if(userDetail?.password === state?.password){
                setError('')
                dispatch(LogInUser({
                    ...state
                }))
            }else{
                setError('Incorrect Password')
            }
        }else{
            setError('User name is not valid')
        }
    }

    const onChange = ({ target = {}})  => {
        const { name = '', value = ''} = target || {}
        setState(prevState => ({ ...prevState, [name] : value}))
    }
    
    return(
        <div className='container-login'>
            <div className='content-login'>
                <Typography.Title className='title'>Login</Typography.Title>
                <InputBox
                    label = 'User name' 
                    name = "userName"
                    inputWidth = "calc(100% - 100px)"
                    onChange = {onChange}
                />
                <InputBox
                    name= "password"
                    type = "password"
                    label = 'Password'
                    inputWidth = "calc(100% - 100px)"
                    onChange = {onChange}
                />
                <div className='login-button-container'>
                    <Button disabled={disableButton} type="primary" className='login-button' onClick={onLoginClick}>Login</Button>
                </div>
                <Link to= "/register">
                    <Typography.Text ellipsis className='sub-text'>
                        Don't have account? Click to register
                    </Typography.Text> 
                </Link> 
          
            </div>

        </div>
    )
}

export default LoginPage