import React from "react";
import {Route, Switch} from "react-router-dom";
import {MainContainer} from "../features/mainContainer/MainContainer";
import {Panaderia} from "../features/panaderia/Panaderia";
import {Pasteleria} from "../features/pasteleria/Pasteleria";
import {Vegetariano} from "../features/vegetariano/Vegetariano";
import {Artesanias} from "../features/artesanias/Artesanias";
import {Vegano} from "../features/vegano/Vegano";
import {Cart} from "../features/cart/Cart";
import {SignIn} from "../features/signIn/SignIn.js";
import {UserRegister} from "../features/userRegister/UserRegister";

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
                <Route path="/Cart"><Cart/></Route>
                <Route path="/SignIn"><SignIn/></Route>
                <Route path="/UserRegister"><UserRegister/></Route>

            </Switch>
        </Switch>
    )
}
