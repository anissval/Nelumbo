import React, {useContext, useEffect, useState} from "react";
import {itemDetailStyles} from "./ItemDetailStyles";
import {Button, Paper} from "@material-ui/core";
import {useHistory} from "react-router-dom"
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => itemDetailStyles(theme));
export const ItemDetail = ({product, component: CustumizedComponent}) => {
    //TODO: replace with redux
    //const {addItem, calculateTotalAmount} = useContext(CartContext);
    const [showCheckoutButtons, setShowCheckoutButtons] = useState(false);
    const history = useHistory();
    const itemDetailClasses = useStyles();

    const onAddToCart = (selectedQuantity) => {
        //TODO : replace with redux
        //addItem(product, selectedQuantity);

        setShowCheckoutButtons(true);
    }

    const handleCancel = () => {
        setShowCheckoutButtons(false);
    }
    const handleOnclick = () => {
        //TODO : replace with redux
        //calculateTotalAmount();

        history.push("/Cart");
    }

    const checkOutButtonOptions = () => {
        return (
            <div>
                <ul>
                    <li style={{listStyle: 'none'}}>
                        <Button variant="outlined" size="large" color="primary" className={itemDetailClasses.margin}
                                onClick={() => {handleOnclick()}}>TERMINAR MI COMPRA</Button>
                    </li>
                    <li style={{listStyle: 'none'}}>
                        <Button variant="outlined" size="large" color="primary" onClick={() => {
                            handleCancel()
                        }}>CANCELAR</Button>
                    </li>
                </ul>
            </div>
        )
    }
    return (
        <Paper className={itemDetailClasses.paper} variant="outlined" elevation={0}>
            <div className={itemDetailClasses.container}>
                <img src={`../images/${product.img}`} alt={product.title}
                     key={`img-${product.id}`}/>
                <div className={itemDetailClasses.itemDescription}>
                    <label>{product.title}</label>
                    <label>{product.description}</label>
                    <label>${product.price}</label>
                </div>
                {
                    showCheckoutButtons ? checkOutButtonOptions() : <CustumizedComponent stock={product.stock}
                                                                                         onAddToCart={onAddToCart}
                                                                                         initial={0}/>
                }
            </div>
        </Paper>
    )
}
