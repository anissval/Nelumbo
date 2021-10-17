import React, {useEffect, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
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

    const handleQuantity = (e) => {
        setQuantity(e.target.value);
    }

    const onAddToCartAndUpdateStock = (selectedQuantity) => {
        let updatedStock = (_stock - quantity);
        setStock(updatedStock);
        onAddToCart(selectedQuantity);
    }

    return (
        <div>
            <div className={itemCountClasses.divExternalStyle}>
                <div>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="quantity-select-standard-label">Cantidad</InputLabel>
                        <Select
                            labelId="quantity-select-label"
                            id="quantity-select"
                            value={quantity}
                            label="Seleccionar Cantidad"
                            color="primary"
                            onChange={(e) => handleQuantity(e)}>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
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
