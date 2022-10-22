import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { InputBox, Typography, Button, SelectBox, Alert} from '../../Component'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { AddUser } from '../../storage/action'

const roleOptions = [
    {
        id : 'role_1',
        label : 'Admin',
        value : 'admin'
    },
    {
        id : 'role_2',
        label : 'User',
        value : 'user'
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
        if(state?.password !== state?.confirmPassword) onAlertOccur('Confirm Password & Password didn\'t match', 'error')
        else if(userDetailIndex === -1){
            dispatch(AddUser({
                ...state
            }))
            onAlertOccur('User created successfully', 'success')
        }else{
            onAlertOccur('User name already exist', 'error')
        }
    }

    return(
        <>
            { alertMessage?.message &&
                <Alert
                    message = { alertMessage?.message || 'Something went wrong'}
                    banner
                    type = {alertMessage?.type}
                    closable
                    afterClose={onClose}
                    className='error-box'
                />
            }
            <div className='container-register'>
                <div className='content-register'>
                    <Typography.Title className='title'>Register</Typography.Title>
                    <InputBox
                        label = 'First name' 
                        name = "firstName"
                        inputWidth = "calc(100% - 150px)"
                        onChange={onChange}
                    />
                    <InputBox
                        label = 'Last name'
                        name = "lastName" 
                        inputWidth = "calc(100% - 150px)"
                        onChange={onChange}
                    />
                    <InputBox
                        label = 'User name'
                        name = "userName" 
                        inputWidth = "calc(100% - 150px)"
                        onChange={onChange}
                    />
                    <InputBox
                        label = 'Password'
                        name = "password"
                        type ="password"
                        inputWidth = "calc(100% - 150px)"
                        onChange={onChange}
                    />
                    <InputBox
                        label = 'Confirm password'
                        name = "confirmPassword"
                        type ="password"
                        inputWidth = "calc(100% - 150px)"
                        onChange={onChange}
                    />
                    <SelectBox
                        label = 'Role' 
                        name = "role"
                        options ={roleOptions}
                        inputWidth = "calc(100% - 150px)"
                        onChange={select => onChange({ target : { name : 'role', value : select || ''}})}
                    />
                    <div className='register-button-container'>
                        <Button disabled={disableButton} type="primary"  className='register-button' onClick={onRegisterClick}>Register</Button>
                    </div>
                    <Link to= "/login">
                        <Typography.Text ellipsis className='sub-text-register'>
                            Already have an account? Go to login
                        </Typography.Text> 
                    </Link> 
            
                </div>

            </div>
        </>

    )
}

export default RegisterPage