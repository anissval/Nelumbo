import React from 'react';
import {renderWithRouterAndRedux} from './utils/TestUtils';
import App from "./App";

describe('App', () => {
    test('renders App component', () => {
        const tree = renderWithRouterAndRedux(<App/>);
        expect(tree).toMatchSnapshot();
    });
});
