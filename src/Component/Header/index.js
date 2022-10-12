import React, { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LogOutUser } from "../../storage/action"
import './index.css'

const Header = props => {

    const { page } = props

    const dispatch = useDispatch()
    const onLogoutClick = () =>{
        dispatch(LogOutUser())
    }
    const { loggedUserReducer : loggedUser } = useSelector( state => state)
    
    const role = useMemo(()=> loggedUser?.role || 'user', [loggedUser])

    const onRedirect = (path = "") =>{
        props.history.push(path)
    }

    return (
        <nav className="navbar is-dark navbar-height"  role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                { page ? <img src={process.env.PUBLIC_URL+"icons/back_arrow_icon.svg"} width = '24px' height="24px"  className="back_image" alt="back_arrow_icon" onClick={()=>props.history.goBack()} />  : null }
                <span className="navbar-item navbar-brand is-size-5 has-text-weight-semibold">
                    {page || 'Pole system'}
                </span>
                <div role="button" className="navbar-burger" aria-label="menu"  aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"> </span>
                </div>
                {/* </Popover> */}
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-end center">
                    {
                        !page ?
                        <div className="navbar-item">
                            <div className="buttons">   
                                <button className="button is-light" onClick={()=>onRedirect('/open_pole')}>
                                    Open list
                                </button>
                                {
                                    role === 'admin' &&
                                    <button className="button is-light" onClick={()=>onRedirect("/close_pole")}>
                                        Close list
                                    </button>
                                }

                            </div>
                        </div> : null
                    }
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
}

export default Header