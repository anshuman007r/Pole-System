import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { InputBox, Typography, Button, SelectBox, Alert} from '../../Component'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { AddUser } from '../../storage/action'

const RegisterPage = props => {
    const [state, setState ] = useState({
        firstName : '',
        lastName : '',
        userName : '',
        password : '',
        confirmPassword : '',
        role : ''
    })
    const [error, setError] = useState('')
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

    const onRegisterClick = () => {
        const userDetailIndex = userDetails?.findIndex(user => user?.userName === state?.userName)
        console.log(userDetailIndex, userDetails, state )
        if(state?.password !== state?.confirmPassword) onErrorOccur('Confirm Password & Password didn\'t match')
        else if(userDetailIndex === -1){
            dispatch(AddUser({
                ...state
            }))
        }else{
            onErrorOccur('User name already exist')
        }
    }

    return(
        <>
            {error &&
                <Alert
                    message = {error || 'Something went wrong'}
                    banner
                    type = "error"
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
                        inputWidth = "calc(100% - 150px)"
                        onChange={select => onChange({ target : { name : 'role', value : select || ''}})}
                    />
                    <div className='register-button-container'>
                        <Button disabled={disableButton} type="primary"  className='register-button' onClick={onRegisterClick}>Register</Button>
                    </div>
                    <Link to= "/login">
                        <Typography.Text ellipsis className='sub-text'>
                            Already have an account? Go to login
                        </Typography.Text> 
                    </Link> 
            
                </div>

            </div>
        </>

    )
}

export default RegisterPage