import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InputBox, Typography, Button, Alert } from '../../Component'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { LogInUser } from '../../storage/action'
import constants from '../../Constants'
const {
    INCORRECT_PASSWORD,
    USERNAME_INVALID_ERROR,
    SOMETHING_WENT_WRONG,
    USERNAME,
    PASSWORD,
    REDIRECT_TO_REGISTER_MESSAGE,
    LOGIN
 } = constants

const LoginPage = props => {
    const [ state, setState] = useState({
        userName : '',
        password : ''
    })
    const [disableButton, setDisableButton] = useState(true) 
    const [error, setError] = useState('')
    const { usersReducer : userDetails } = useSelector(state => state)
    // console.log('userReducer', userDetails)
    const dispatch = useDispatch()
    // const dispatch = () => {}

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
                    ...userDetail
                }))
            }else{
                onErrorOccur(INCORRECT_PASSWORD)
            }
        }else{
            onErrorOccur(USERNAME_INVALID_ERROR)
        }
    }

    const onErrorOccur = (message = '') =>{
        setError(message)
        closeErrorAuto()
    }

    const onClose = () =>{
        setError('')
    }

    const closeErrorAuto = () =>{
        setTimeout(onClose,5000)
    }

    const onChange = ({ target = {}})  => {
        const { name = '', value = ''} = target || {}
        setState(prevState => ({ ...prevState, [name] : value}))
    }

    const redirectToRegister = () => props.history.push('\register')
    
    return(
        <>
            {error &&
                <Alert
                    message = {error || SOMETHING_WENT_WRONG}
                    banner
                    type = "error"
                    closable
                    afterClose={onClose}
                    className='error-box'
                />
            }
            <div className='container-login'>
                <div className='content-login'>
                    <Typography.Title className='title'>{LOGIN}</Typography.Title>
                    <InputBox
                        data-testid = {'username'}
                        label = {USERNAME}
                        name = "userName"
                        inputWidth = "calc(100% - 100px)"
                        onChange = {onChange}
                    />
                    <InputBox
                        name= "password"
                        type = "password"
                        label = {PASSWORD}
                        data-testid = "password"
                        inputWidth = "calc(100% - 100px)"
                        onChange = {onChange}
                    />
                    <div className='login-button-container'>
                        <Button disabled={disableButton} type="primary" className='login-button' onClick={onLoginClick}>{LOGIN}</Button>
                    </div>
                    <Link to= "/register">
                        <Typography.Text data-testid = "redirect-register" ellipsis className='sub-text-login'>
                            {REDIRECT_TO_REGISTER_MESSAGE}
                        </Typography.Text> 
                    </Link> 
            
                </div>

            </div>
        </>

    )
}

export default LoginPage