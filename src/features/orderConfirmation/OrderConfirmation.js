import React from "react";
import {Grid} from "@material-ui/core";
import {useSelector} from "react-redux";

export const OrderConfirmation = () => {
    const auth = useSelector(state => state.firebase.auth);

    return (<>
        <Grid container item xs={12} spacing={1}>
            <Grid item xs={12} sm={12} md={12}>
                <div>Gracias {auth.displayName} por tu compra, ID de tu compra: #548043509454</div>
            </Grid>
        </Grid>
    </>);
}
