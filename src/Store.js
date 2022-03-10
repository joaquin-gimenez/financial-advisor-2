import React, { useState } from 'react';
import { createStore } from 'redux';
import reducer from './redux/root-reducer'
  
const store = createStore(reducer);

export default store;

