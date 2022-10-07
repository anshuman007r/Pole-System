// import logo from './logo.svg';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import { RouterWrapper} from './Container'
import { Provider } from 'react-redux'
import { store, persistedStore} from './storage/store'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <RouterWrapper/>
        </PersistGate>
      </Provider>   
    </div>
  );
}

export default App;
