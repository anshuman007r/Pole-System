import reducer from "../reducer";
import { createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
    key : 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(
    persistedReducer,
    composeWithDevTools() 
    )

const persistedStore = persistStore(store)

export { store, persistedStore}
