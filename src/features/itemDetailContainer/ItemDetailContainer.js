import React from "react";
import {CircularProgress} from "@material-ui/core";
import {itemDetailCointainerStyle} from "./ItemDetailContainerStyles";
import {ItemDetail} from "../itemDetail/ItemDetail";
import {useParams} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import {useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => itemDetailCointainerStyle(theme));

export const ItemDetailContainer = () => {
    const classes = useStyles();
    const {id} = useParams();
    useFirestoreConnect([{
        collection: 'productos',
        doc: id
    }]);
    const products = useSelector(state => state.firestore.ordered.productos);

    return (
        <>
            {
                (products && products.length !== 0) ? (
                    <ItemDetail product={products[0]}/>
                ) : (<div className={classes.loading}><CircularProgress size={100}/></div>)
            }
        </>
    )
}
