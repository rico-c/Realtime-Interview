import React, { FC } from 'react';
import { Provider } from 'react-redux';
import store from '@/reducers/store';
import Routes from './routes';
import './App.scss';

const App: FC = () => {
  return (
      <Provider store={store}>
        <Routes />
      </Provider>
  );
}

export default App;
