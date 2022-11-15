import React from "react";
import StoreWrapper from "../StoreWrapper";
import RouterWrapper from "../RouteWrapper";
import Login from './index'

const LoginWrapper = props => {
    return (
        <StoreWrapper>
            <RouterWrapper>
                <Login/>
            </RouterWrapper>
        </StoreWrapper>
    )
}

export default LoginWrapper