import React, { FC } from 'react';
import { Provider } from 'react-redux';
import store from './reducers/store';
import { persistor } from './reducers/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import RoutesJSX from './routes';
import './App.scss';

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RoutesJSX />
      </PersistGate>
    </Provider>
  );
}

export default App;
