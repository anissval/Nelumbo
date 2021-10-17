import React from 'react';
import {Grid} from "@material-ui/core";
import {UserForm} from "../userForm/UserForm";
import {CartDetails} from "../cartDetails/CartDetails";

export const Cart = () => {
    return (<div>
        <Grid container item xs={12} spacing={1}>
            <Grid item xs={12} sm={12} md={7}>
                <CartDetails/>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
                <UserForm/>
            </Grid>
        </Grid>
    </div>)
}
