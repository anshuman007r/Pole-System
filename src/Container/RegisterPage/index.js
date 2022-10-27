import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { InputBox, Typography, Button, SelectBox, Alert} from '../../Component'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { AddUser } from '../../storage/action'
import constants from '../../Constants'
const { 
    ADMIN, 
    USER, 
    USERNAME, 
    FIRST_NAME, 
    LAST_NAME, 
    PASSWORD, 
    PASSWORD_MISMATCH_ERROR,
    CONFIRM_PASSWORD,
    ROLE,
    USER_CREATED_MESSAGE,
    USER_NAME_EXIST,
    SOMETHING_WENT_WRONG,
    REDIRECT_TO_LOGIN_MESSAGE,
    REGISTER
 } = constants

const roleOptions = [
    {
        id : 'role_1',
        label : 'Admin',
        value : ADMIN
    },
    {
        id : 'role_2',
        label : 'User',
        value : USER
    }
]

const RegisterPage = props => {
    const [state, setState ] = useState({
        firstName : '',
        lastName : '',
        userName : '',
        password : '',
        confirmPassword : '',
        role : ''
    })
    const [alertMessage, setAlertMessage] = useState({
        message : '',
        type : ''
    })
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state?.usersReducer || [])
    const [disableButton, setDisableButton] = useState(true)

    useEffect(()=>{
        if(
            state?.firstName
            && state?.lastName 
            && state?.userName 
            && state?.password 
            && state?.confirmPassword
            && state?.role
        ){
            setDisableButton(false)
        } 
        else setDisableButton(true)
    },[state])

    const onChange = ({ target = {}}) =>{
        const { name = '', value = ''} = target  || {}
        // console.log('#',name, value)
        setState(prevState => ({ ...prevState, [name] : value}))
    }

    const onAlertOccur = (message = '', type = '') =>{
        setAlertMessage({message, type})
        closeAlertAuto(type)
    }

    const onClose = () =>{
        setAlertMessage({ message : '', type : ''})
    }

    const closeAlertAuto = (type = '') =>{
        setTimeout(type !== 'success' ? onClose : onRedirectToLogin, 5000)
    }

    const onRedirectToLogin = () =>{
        setAlertMessage({ message : '', type : ''})
        props.history.push('/login')
    }

    const onRegisterClick = () => {
        const userDetailIndex = userDetails?.findIndex(user => user?.userName === state?.userName)
        // console.log(userDetailIndex, userDetails, state )
        if(state?.password !== state?.confirmPassword) onAlertOccur(PASSWORD_MISMATCH_ERROR, 'error')
        else if(userDetailIndex === -1){
            dispatch(AddUser({
                ...state
            }))
            onAlertOccur(USER_CREATED_MESSAGE, 'success')
        }else{
            onAlertOccur(USER_NAME_EXIST, 'error')
        }
    }

    return(
        <>
            { alertMessage?.message &&
                <Alert
                    message = { alertMessage?.message || SOMETHING_WENT_WRONG}
                    banner
                    type = {alertMessage?.type}
                    closable
                    afterClose={onClose}
                    className='error-box'
                />
            }
            <div className='container-register'>
                <div className='content-register'>
                    <Typography.Title className='title'>{REGISTER}</Typography.Title>
                    <InputBox
                        label = {FIRST_NAME}
                        name = "firstName"
                        inputWidth = "calc(100% - 150px)"
                        onChange={onChange}
                    />
                    <InputBox
                        label = {LAST_NAME}
                        name = "lastName" 
                        inputWidth = "calc(100% - 150px)"
                        onChange={onChange}
                    />
                    <InputBox
                        label = {USERNAME}
                        name = "userName" 
                        inputWidth = "calc(100% - 150px)"
                        onChange={onChange}
                    />
                    <InputBox
                        label = {PASSWORD}
                        name = "password"
                        type ="password"
                        inputWidth = "calc(100% - 150px)"
                        onChange={onChange}
                    />
                    <InputBox
                        label = {CONFIRM_PASSWORD}
                        name = "confirmPassword"
                        type ="password"
                        inputWidth = "calc(100% - 150px)"
                        onChange={onChange}
                    />
                    <SelectBox
                        label = {ROLE}
                        name = "role"
                        options ={roleOptions}
                        inputWidth = "calc(100% - 150px)"
                        onChange={select => onChange({ target : { name : 'role', value : select || ''}})}
                    />
                    <div className='register-button-container'>
                        <Button disabled={disableButton} type="primary"  className='register-button' onClick={onRegisterClick}>{REGISTER}</Button>
                    </div>
                    <Link to= "/login">
                        <Typography.Text ellipsis className='sub-text-register'>
                            {REDIRECT_TO_LOGIN_MESSAGE}
                        </Typography.Text> 
                    </Link> 
            
                </div>

            </div>
        </>

    )
}

export default RegisterPage