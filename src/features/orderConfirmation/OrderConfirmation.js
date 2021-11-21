import React, {useEffect} from "react";
import {Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {clearCartContent} from "../../actions/cartContent";

export const OrderConfirmation = () => {
    const auth = useSelector(state => state.firebase.auth);
    const userName = auth.displayName;
    const orderId = useSelector((state) => state.nelumboCartContent.orderId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCartContent());
    }, []);

    return (<>
        <Grid container item xs={12} spacing={1}>
            <Grid item xs={12} sm={12} md={12}>
                <div>Gracias {userName} por tu compra. ID COMPRA : {orderId}</div>
            </Grid>
        </Grid>
    </>);
}
