import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux'
import rootReducers from './reducers/rootReducers';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
const store = createStore(rootReducers);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
      <App />
    </Provider> 
);
reportWebVitals();
