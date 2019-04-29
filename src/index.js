import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import shopReducer from './store/reducer/reducer';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import Root from './components/Root/Root';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = shopReducer;

export const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(<Root store={store}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
