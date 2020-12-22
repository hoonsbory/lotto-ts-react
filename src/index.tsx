import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { compose, createStore } from 'redux';
import rootReducer from './store/index';
import { ThemeProvider } from 'styled-components'
import theme from './theme.'
// **** (1) Provider 불러오기
import { Provider } from 'react-redux'
import Global from './global'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers())

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <App />
    <Global></Global>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
