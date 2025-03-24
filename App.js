import React from 'react';
import { Provider } from 'react-redux';
import store from './Lab5/redux/store';
import HomeScreen from './Lab5/screens/HomeScreen';

const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

export default App;
