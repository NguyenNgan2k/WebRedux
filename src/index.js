import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux'
import rootReducers from './reducers/rootReducers';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/rootSaga';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
      <App />
    </Provider> 
);
reportWebVitals();
