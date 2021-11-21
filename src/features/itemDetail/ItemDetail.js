import React from "react";
import {itemDetailStyles} from "./ItemDetailStyles";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart, calculateTotalAmount, calculateTotalItems, updateItemToCart} from "../../actions/cartContent";

const useStyles = makeStyles((theme) => itemDetailStyles(theme));
export const ItemDetail = ({product, component: CustumizedComponent}) => {
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
