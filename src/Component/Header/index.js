import React, { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LogOutUser } from "../../storage/action"
import './index.css'

const buttons = [
    {
        name : 'Open List',
        icon : '',
        label : 'Open List',
        redirect_link : '/pole'
    },
    {
        name : 'Close List',
        icon : '',
        label : 'Close List',
        redirect_link : '/close_pole'
    },
    {
        name : 'Add Pole',
        icon : 'add_icon.svg',
        label : 'Add Pole',
        redirect_link : ''
    },
]

const Header = props => {

    const { page, onOpenModal } = props
    const [isActive, setIsActive] = useState(false)

    const dispatch = useDispatch()
    const onLogoutClick = () =>{
        dispatch(LogOutUser())
    }
    const { loggedUserReducer : loggedUser } = useSelector( state => state)
    
    const role = useMemo(()=> loggedUser?.role || 'user', [loggedUser])

    const headerButton  = useMemo(()=>{
        if(!page){
            return buttons?.filter(res => role === 'admin' ? (res?.name !== 'Add Pole') : (res?.name === 'Open List') )
        }else if( page === 'Open Poles'){
            return role === 'admin' ? buttons?.filter(res => res?.name === 'Add Pole') : []
        }else{
            return []
        }
    },[page, role])

    const onRedirect = (path = "") =>{
        props.history.push(path)
    }

    const onButtonClick = (path) => {
        if(path) onRedirect(path)
        else onOpenModal()
    }

    const toggleBurger = () => {
        setIsActive(prevState => !prevState)
    }

    return (
        <nav className="navbar is-dark navbar-height"  role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                { page ? <img src={process.env.PUBLIC_URL+"icons/back_arrow_icon.svg"} width = '24px' height="24px"  className="back_image" alt="back_arrow_icon" onClick={()=>props.history.goBack()} />  : null }
                <span className="navbar-item navbar-brand is-size-5 has-text-weight-semibold">
                    {page || 'Pole system'}
                </span>
                <div role="button" className="navbar-burger" aria-label="menu"  aria-expanded="false" data-target="navbarBasicExample" onClick={toggleBurger}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"> </span>
                </div>
                {/* </Popover> */}
            </div>

            <div id="navbarBasicExample" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
                <div className="navbar-end center">
                    <div className="navbar-item">
                        <div className="buttons"> 
                            {
                                headerButton?.map(({ label, icon, redirect_link}, index)=>(
                                    <button key={`action_${index}`} className="button is-light" onClick={()=>onButtonClick(redirect_link)}>
                                        { 
                                            icon && 
                                            <img src={process.env.PUBLIC_URL+`icons/${icon}`} className="button_icon" width = '20px' height="18px" alt="add_icon" />
                                        }
                                        {label || ''}
                                    </button>
                                ))
                            }  
                        </div>
                    </div>
                    <button className="navbar-item logout-button" onClick={onLogoutClick}>
                        <img src={process.env.PUBLIC_URL+"icons/logout_icon.svg"} width = '20px' height="18px" alt="Logout_icon" />
                        Log out
                    </button>
                </div>
            </div>
        </nav>
    )
}

Header.defaultProps = {
    page : '',
    onOpenModal : () => {}
}

export default Header