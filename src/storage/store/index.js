import reducer from "../reducer";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist'
import storage from "redux-persist/lib/storage";
// import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
    key : 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer : persistedReducer,
    devTools : true,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    
})

const persistedStore = persistStore(store)

export { store, persistedStore}
