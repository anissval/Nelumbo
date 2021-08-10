import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import {BrowserRouter} from "react-router-dom";
import {rrfProps, store} from "./firebase/firebase";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
              <BrowserRouter>
                  <App />
              </BrowserRouter>
          </ReactReduxFirebaseProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
