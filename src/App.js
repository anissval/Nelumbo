import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./navigation/AppRouter";
import {MainContainer} from "./features/mainContainer/MainContainer";

export const App = () => {
    return (
        <MainContainer/>)
}
export default App;
