import React from 'react';
import {Grid} from "@material-ui/core";
import {useSelector} from "react-redux";
import {SignIn} from "../signIn/SignIn";
import {makeStyles} from "@material-ui/styles";
import {cartStyles} from "./Cart.styles";
import {CartDetails} from "../cartDetails/CartDetails";
import {EMPTY_CART_MESSAGE} from "../../utils/constants/constants";

const useStyles = makeStyles((theme) => cartStyles(theme));
export const Cart = () => {
    const content = useSelector((state) => state.nelumboCartContent.cartContent);
    return (<>
        {(content.length !== 0) ? (<Grid container item xs={12} spacing={1}>
            <Grid item xs={12} sm={12} md={7}>
                <CartDetails/>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
                <SignIn/>
            </Grid>
        </Grid>) : <EmptyCart/>
        }
    </>)
}

export const EmptyCart = () => {
    const cartClasses = useStyles();
    return (<div className={cartClasses.root}>
        <p><img alt={"empty cart"} src={process.env.PUBLIC_URL + '/images/emptyCart.png'}/></p>
        <p>{EMPTY_CART_MESSAGE}</p>
    </div>)
}