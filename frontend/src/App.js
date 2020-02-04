import React from 'react';
// import logo from './logo.svg';
import './App.css';
import AppRouter from "./Routes/AppRouter"
import { Provider } from 'react-redux'
import store from './Store/configureStore'

// const store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  );
}

export default App;
