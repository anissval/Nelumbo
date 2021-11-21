import React from "react";
import {
    Grid,
    IconButton, MenuItem, Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch, useSelector} from "react-redux";
import {
    calculateTotalAmount,
    calculateTotalItems,
    removeItemFromCart,
    updateItemToCart
} from "../../actions/cartContent";

export const CartDetails = () => {
    const content = useSelector((state) => state.nelumboCartContent.cartContent);
    const totalAmount = useSelector((state) => state.nelumboCartContent.totalAmount);
    const totalItems = useSelector((state) => state.nelumboCartContent.totalItems);
    const dispatch = useDispatch();

    const handleDelete = (itemID) => {
        dispatch(removeItemFromCart(itemID));
        dispatch(calculateTotalAmount());
        dispatch(calculateTotalItems());
    }

    const handleChangeQuantity = (product, e) => {
        dispatch(updateItemToCart(product, e.target.value));
        dispatch(calculateTotalAmount());
        dispatch(calculateTotalItems());
    }

    return (
        (content.length !== 0) &&
        <Grid container item xs={12} sm={12} md={12}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow key={'table-header'}>
                            <TableCell>PRODUCTO</TableCell>
                            <TableCell align="right">PRECIO</TableCell>
                            <TableCell align="right">CANTIDAD</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {content.map((row) => (
                            <TableRow
                                key={row.item.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">
                                    {row.item.title}
                                </TableCell>
                                <TableCell align="right">${row.item.price}</TableCell>
                                <TableCell align="right"> <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={row.quantity}
                                    label="Cantidad"
                                    onChange={(e) => handleChangeQuantity(row.item, e)}>
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
                                </TableCell>
                                <TableCell align="right"><IconButton aria-label="delete" onClick={() => {
                                    handleDelete(row.item.id)
                                }}>
                                    <DeleteIcon/>
                                </IconButton></TableCell>
                            </TableRow>
                        ))}
                        <TableRow key={'table-quantity'}>
                            <TableCell rowSpan={3}/>
                            <TableCell colSpan={2}>Cantidad</TableCell>
                            <TableCell align="right">
                                {totalItems}</TableCell>
                        </TableRow>
                        <TableRow key={'table-totalAmount'}>
                            <TableCell>Total</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">${totalAmount}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}
