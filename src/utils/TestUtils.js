// test-utils.js
import React from 'react'
import {render as rtlRender} from '@testing-library/react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

// my reducer
import {rootReducer} from "../reducers/reducers";
import {BrowserRouter} from "react-router-dom";

const renderWithRouterAndRedux = (ui, {
    route = '/',
    initialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
} = {}) => {
    window.history.pushState({}, 'Test page', route);

    const ReduxWrapper = ({children}) => {
        return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>
    }
    return rtlRender(ui, {wrapper: ReduxWrapper, ...renderOptions});
};

const renderWithRedux = (ui, {
    initialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
} = {}) => {
    const ReduxWrapper = ({children}) => {
        return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>
    }
    return rtlRender(ui, {wrapper: ReduxWrapper, ...renderOptions});
};
// re-export everything
export * from '@testing-library/react'
// override render method
export {renderWithRouterAndRedux, renderWithRedux};
