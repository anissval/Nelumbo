import React from 'react';
import { renderWithRedux } from './utils/TestUtils';
import App from "./App";

describe('App', () => {
    test('renders App component', () => {
        const tree = renderWithRedux(<App/>);
        expect(tree).toMatchSnapshot();
    });
});
