import React, {useEffect, useState} from "react";
import {Button} from "@material-ui/core";
import {itemCountStyle} from "./ItemCountStyle";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => itemCountStyle(theme));

export const ItemCount = ({stock, onAddToCart, initial}) => {

    const itemCountClasses = useStyles();
    let [_stock, setStock] = useState(stock);
    const [quantity, setQuantity] = useState(initial);
    let [_stockAvailable, setStockAvailable] = useState(true);

    useEffect(() => {
        const validateStock = () => {
            if (_stock !== 0 && quantity <= _stock) {
                setStockAvailable(true);
            } else {
                setStockAvailable(false);
            }
        }
        validateStock();
    }, [_stock, quantity]);

    const onAddItem = () => {
        if (quantity < _stock) {
            setQuantity(quantity + 1);
        }
    }

    const removeItem = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }

    const onAddToCartAndUpdateStock = (selectedQuantity) => {
        let updatedStock = (_stock - quantity);
        setStock(updatedStock);
        setQuantity(0);
        onAddToCart(selectedQuantity);
    }

    return (
        <div>
            <div className={itemCountClasses.divExternalStyle}>
                <div className={itemCountClasses.counterContainer}>
                    <Button variant="outlined" size="large" color="primary" disabled={quantity === 0}
                            onClick={_stock !== 0 ? () => removeItem() : undefined}>-
                    </Button>
                    <div className={itemCountClasses.quantity}><label>{quantity}</label>
                    </div>
                    <Button variant="outlined" size="large" color="primary" disabled={(quantity === _stock)}
                            onClick={quantity <= _stock ? () => onAddItem() : undefined}>+
                    </Button>
                </div>
                <Button disabled={!_stockAvailable || quantity === 0} variant="outlined" size="large"
                        color="primary" className={itemCountClasses.margin}
                        onClick={(_stockAvailable && quantity !== 0) ? () => onAddToCartAndUpdateStock(quantity) : undefined}>
                    AGREGAR AL CARRITO
                </Button>
            </div>
        </div>
    )
}
