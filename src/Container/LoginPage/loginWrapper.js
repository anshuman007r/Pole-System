import React from "react";
import StoreWrapper from "../StoreWrapper";
import RouterWrapper from "../RouteWrapper";
import Login from './index'
import { storeFactory } from "../../helper";

const LoginWrapper = props => {
    let store = storeFactory({})
    return (
        <StoreWrapper store={store}>
            <RouterWrapper>
                <Login/>
            </RouterWrapper>
        </StoreWrapper>
    )
}

export default LoginWrapper