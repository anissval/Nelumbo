import React from "react";
import {Route, Switch} from "react-router-dom";
import {Cart} from "../features/cart/Cart";
import {SignIn} from "../features/signIn/SignIn.js";
import {ItemDetailContainer} from "../features/itemDetailContainer/ItemDetailContainer";
import {ItemsListContainer} from "../features/itemsListContainer/ItemsListContainer";
import {OrderConfirmation} from "../features/orderConfirmation/OrderConfirmation";
import {Admin} from "../features/admin/Admin";

export const AppRouter = () => {

    return(
        <Switch>
            <Switch>
                <Route exact path="/"><ItemsListContainer/></Route>
                <Route path="/Admin"><Admin/></Route>
                <Route path="/Cart"><Cart/></Route>
                <Route path="/OrderConfirmation"><OrderConfirmation/></Route>
                <Route path="/SignIn"><SignIn/></Route>
                <Route path="/item/:id"><ItemDetailContainer/></Route>
                <Route path="/category/:categoryID"><ItemsListContainer/></Route>
            </Switch>
        </Switch>
    )
}
