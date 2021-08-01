import React, {useContext} from "react";
import {Badge} from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {cartWidgetStyle} from "./CartWidget.styles";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => cartWidgetStyle(theme));

export const CartWidget = () => {
    const totalItemsIntoCart = 5;
    const classes = useStyles();

    return <div className={classes.container}>
        <Badge badgeContent={totalItemsIntoCart} color="primary">
            <ShoppingCartIcon/>
        </Badge>
    </div>
}
