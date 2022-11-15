import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LogOutUser } from "../../storage/action"
import { CloseCircleOutlined } from "@ant-design/icons"
import './index.css'
import constants from "../../Constants"
const {
    ADMIN,
    USER,
    CLOSE_LIST,
    ADD_POLE,
    OPEN_LIST,
    OPEN_POLES,
    POLE_SYSTEM,
    LOG_OUT
} = constants

const buttons = [
    {
        name : OPEN_LIST,
        icon : '',
        label : OPEN_LIST,
        redirect_link : '/pole'
    },
    {
        name : CLOSE_LIST,
        icon : '',
        label : CLOSE_LIST,
        redirect_link : '/close_pole'
    },
    {
        name : ADD_POLE,
        icon : 'add_icon.svg',
        label : ADD_POLE,
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
    
    const role = useMemo(()=> loggedUser?.role || USER, [loggedUser])

    useEffect(()=>{
        function handleWindowResize() {
            if(window.innerWidth > 1016) setIsActive(false) // closing navbar-burger popover when width is more than 1016
          } 
          window.addEventListener('resize', handleWindowResize); // adding event listener on window
      
          return () => {
            window.removeEventListener('resize', handleWindowResize); // removing event listener on window
          };
    },[])

    const headerButton  = useMemo(()=>{
        if(!page){
            return buttons?.filter(res => role === ADMIN ? (res?.name !== ADD_POLE) : (res?.name === OPEN_LIST) )
        }else if( page === OPEN_POLES){
            return role === ADMIN ? buttons?.filter(res => res?.name === ADD_POLE) : []
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
        <nav data-testid = "header-container" className="navbar is-dark navbar-height"  role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                { page ? <img src={process.env.PUBLIC_URL+"icons/back_arrow_icon.svg"} width = '24px' height="24px"  className="back_image" alt="back_arrow_icon" onClick={()=>props.history.goBack()} />  : null }
                <span className="navbar-item navbar-brand is-size-5 has-text-weight-semibold">
                    {page || POLE_SYSTEM}
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
                        {
                            isActive ? 
                            <div className="close-button-container">
                                <CloseCircleOutlined onClick={toggleBurger}/>
                            </div> : null
                        }
                            {
                                headerButton?.map(({ label, icon, redirect_link}, index)=>(
                                    <div className="navbar-item end-nav-item"  key={`action_${index}`}>
                                        <button style={{ width : '100%'}} className="button is-light" onClick={()=>onButtonClick(redirect_link)}>
                                        <div className={icon ? "logout-button-content" : ''}>
                                            { 
                                                icon && 
                                                <img src={process.env.PUBLIC_URL+`icons/${icon}`} className="button_icon" width = '20%' height="18px" alt="add_icon" />
                                            }
                                            {label || ''}
                                        </div>
                                        </button>
                                    </div>
                                ))
                            }  
                        {/* </div> */}
                    <div className="navbar-item end-nav-item" key="logout">
                        <button  className="logout-button" onClick={onLogoutClick}>
                            <div className="logout-button-content">
                                <img src={process.env.PUBLIC_URL+"icons/logout_icon.svg"} width = '20px' height="18px" alt="Logout_icon" />
                                {LOG_OUT}
                            </div>
                        </button>
                    </div>
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