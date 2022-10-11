import React from 'react'
// import { PageHeader } from 'antd'
import './index.css'
import { useDispatch } from 'react-redux';
import { LogOutUser } from '../../storage/action';

const MainPage = props => {
    const dispatch = useDispatch()
    const routes = [
        {
          path: 'index',
          breadcrumbName: 'First-level Menu',
        },
        {
          path: 'first',
          breadcrumbName: 'Second-level Menu',
        },
        {
          path: 'second',
          breadcrumbName: 'Third-level Menu',
        },
      ];

    const onLogoutClick = () =>{
        dispatch(LogOutUser())
    }

    return(
        <>
            <nav class="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <span class="navbar-item navbar-brand is-size-5 has-text-weight-semibold">
                        {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/> */}
                        Pole system
                    </span>

                    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true">   </span>
                    </a>
                </div>

                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-end center">
                        <div class="navbar-item">
                            <div class="buttons">   
                                <a class="button is-light">
                                    Open list
                                </a>
                                <a class="button is-light">
                                    Close list
                                </a>
                            </div>
                        </div>
                        <a class="navbar-item logout-button" onClick={onLogoutClick}>
                            <img src={process.env.PUBLIC_URL+"icons/logout_icon.svg"} width = '20px' height="18px" />
                            Log out
                        </a>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default MainPage