import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// import { createStore } from 'redux';
import { applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk'

import App from './components/App';
import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore({
  reducer: reducers,
  devTools: composeEnhancers(applyMiddleware(reduxThunk))
})
// const store = createStore(reducers)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
