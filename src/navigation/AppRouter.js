import React from "react";
import {Route, Switch} from "react-router-dom";
import {MainContainer} from "../features/mainContainer/MainContainer";
import {Panaderia} from "../features/panaderia/Panaderia";
import {Pasteleria} from "../features/pasteleria/Pasteleria";
import {Vegetariano} from "../features/vegetariano/Vegetariano";
import {Artesanias} from "../features/artesanias/Artesanias";
import {Vegano} from "../features/vegano/Vegano";

export const AppRouter = () => {

    return(
        <Switch>
            <Switch>
                <Route exact path="/"><Panaderia/></Route>
                <Route path="/Panaderia"><Panaderia/></Route>
                <Route path="/Pasteleria"><Pasteleria/></Route>
                <Route path="/Vegetariano"><Vegetariano/></Route>
                <Route path="/Vegano"><Vegano/></Route>
                <Route path="/Artesanias"><Artesanias/></Route>
            </Switch>
        </Switch>
    )
}
