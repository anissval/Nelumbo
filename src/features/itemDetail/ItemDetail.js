import React, {useEffect, useState} from "react";
import {itemDetailStyles} from "./ItemDetailStyles";
import {Button, CircularProgress, Paper} from "@material-ui/core";
import {useHistory} from "react-router-dom"
import {makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart, calculateTotalAmount, calculateTotalItems, updateItemToCart} from "../../actions/cartContent";
import {setCategory} from "../../actions/categories";
import {CATEGORY_CARRITO} from "../../utils/constants/constants";

const useStyles = makeStyles((theme) => itemDetailStyles(theme));
export const ItemDetail = ({product, component: CustumizedComponent}) => {
    const [showCheckoutButtons, setShowCheckoutButtons] = useState(false);
    const history = useHistory();
    const itemDetailClasses = useStyles();
    const dispatch = useDispatch();
    const content = useSelector((state) => state.nelumboCartContent.cartContent);

    const onAddToCart = (selectedQuantity) => {
        const dataToUpdate = isItemIntoCart(product);
        if (dataToUpdate) {
            const updatedQuantity = dataToUpdate.quantity + selectedQuantity;
            dispatch(updateItemToCart(product, updatedQuantity));
        } else {
            dispatch(addItemToCart(product, selectedQuantity));
        }
        dispatch(calculateTotalAmount());
        dispatch(calculateTotalItems());
    }

    const isItemIntoCart = (item) => {
        const cartContentFiltered = content.filter((entry) => entry.item.id === item.id);
        if (cartContentFiltered.length > 0) {
            return cartContentFiltered[0];
        } else {
            return null;
        }
    }

    const handleOnclick = () => {
        dispatch(setCategory(CATEGORY_CARRITO));
        history.push("/Cart");
    }

    return (
        <Paper className={itemDetailClasses.paper} variant="outlined" elevation={0}>
            <div className={itemDetailClasses.container}>
                    <img loading="lazy" src={product.img} alt={product.title}
                         key={`img-${product.id}`}/>
                <div className={itemDetailClasses.itemDescription}>
                    <label>{product.title}</label>
                    <label>{product.description}</label>
                    <label>${product.price}</label>
                </div>
                {
                    <CustumizedComponent stock={product.stock} onAddToCart={onAddToCart} initial={1}/>
                }
            </div>
        </Paper>
    )
}
