import React from "react";
import {Grid} from "@material-ui/core";
import {UserForm} from "../userForm/UserForm";

export const CartDetails = () => {
    return (
        <Grid container item xs={12} spacing={1}>
            <Grid container item xs={12} sm={12} md={12}>
                <Grid item xs={6} sm={6} md={6}>
                    producto
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    precio
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    cantidad
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    borrar
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
               hola
            </Grid>
        </Grid>
    )
}
