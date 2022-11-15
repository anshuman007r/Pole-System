import React from "react";
import { Provider } from 'react-redux'
import { storeFactory } from "../../helper";

const StoreWrapper = props => {
    const { children, initialState = {} } = props
    const store = storeFactory(initialState)
    return (
        <Provider store={store}>                
            {children}
        </Provider>
    )
}

export default StoreWrapper