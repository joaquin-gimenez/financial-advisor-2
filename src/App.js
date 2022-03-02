import { React } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';

import './assets/scss/index.scss';

import Header from './layouts/Header'
import Home from './Home'
import Calculator from './Calculator'

import store from './Store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header/>

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="calculator" element={<Calculator />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default App;
