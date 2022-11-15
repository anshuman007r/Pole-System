import React from "react";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import { store, persistedStore} from '../../storage/store'

const StoreWrapper = props => {
    const { children } = props
    return (
        <Provider store={store}>
            <PersistGate persistor={persistedStore}>
                {children}
            </PersistGate> 
        </Provider>
    )
}

export default StoreWrapper