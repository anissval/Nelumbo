import React, {useEffect} from "react";
import {Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {clearCartContent} from "../../actions/cartContent";
import {makeStyles} from "@material-ui/styles";
import {orderConfirmationStyles} from "./OrderConfirmation.styles";

const useStyles = makeStyles((theme) => orderConfirmationStyles(theme));

export const OrderConfirmation = () => {
    const orderConfirmationClasses = useStyles();
    const auth = useSelector(state => state.firebase.auth);
    const userName = auth.displayName;
    const orderId = useSelector((state) => state.nelumboCartContent.orderId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCartContent());
    }, []);

    return (<div className={orderConfirmationClasses.root}>
        <Grid container item xs={12} spacing={2} direction="row"
              justifyContent="center"
              alignItems="center">
            <Grid item xs={6} sm={6} md={6}>
                <img alt={"nelumbo logo"}
                    src={'https://firebasestorage.googleapis.com/v0/b/nelumbo-ce964.appspot.com/o/images%2Fnelumbo_logo.jpeg?alt=media&token=5aea4fbb-dd4a-477e-a501-26ec5a8a92e4'}/>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
                <p>{userName}</p>
                <p>Gracias por tu compra! </p>
                <p>ID COMPRA : {orderId}</p>
            </Grid>
        </Grid>
    </div>);
}
