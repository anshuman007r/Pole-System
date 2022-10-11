import React from "react"

const Header = props => {

    const { onLogoutClick } = props

 return (
    <nav class="navbar is-dark"  role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <span class="navbar-item navbar-brand is-size-5 has-text-weight-semibold">
                Pole system
            </span>
            {/* <Popover
                content={<button onClick={onHide}>Close</button>}
                title="Title"
                trigger="click"
                placement='bottom'
                open={open}
                onOpenChange={handleOpenChange}
            > */}
            <div role="button" class="navbar-burger" aria-label="menu"  aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"> </span>
            </div>
            {/* </Popover> */}
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-end center">
                <div class="navbar-item">
                    <div class="buttons">   
                        <button class="button is-light">
                            Open list
                        </button>
                        <button class="button is-light">
                            Close list
                        </button>
                    </div>
                </div>
                <button class="navbar-item logout-button" onClick={onLogoutClick}>
                    <img src={process.env.PUBLIC_URL+"icons/logout_icon.svg"} width = '20px' height="18px" alt="Logout_icon" />
                    Log out
                </button>
            </div>
        </div>
    </nav>
 )
}

Header.defaultProps = {
    onLogoutClick : () => {}
}

export default Header