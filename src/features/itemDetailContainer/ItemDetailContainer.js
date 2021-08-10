import React, {useCallback, useEffect, useState} from "react";
import {CircularProgress} from "@material-ui/core";
import {itemDetailCointainerStyle} from "./ItemDetailContainerStyles";
import {ItemDetail} from "../itemDetail/ItemDetail";
import {useParams} from "react-router-dom";
import {ItemCount} from "../itemCount/ItemCount";

import {makeStyles} from "@material-ui/styles";
import {isEmpty, isLoaded, useFirebaseConnect, useFirestore, useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import {processProductFromDB} from "../../utils/Utils";


const useStyles = makeStyles((theme) => itemDetailCointainerStyle(theme));

export const ItemDetailContainer = () => {
    const classes = useStyles();
    //const [products, setProducts] = useState([]);
    const {id} = useParams();

    useFirestoreConnect([{
        collection: 'productos',
        doc: id
    }]);
    const products = useSelector(state =>  state.firestore.ordered.productos);
    //const firestore = useFirestore();
    const x = 'x';

    /*const getProductByID = (id) => {
        const productsCollection = firestore.collection('productos');
        const product = productsCollection.doc(id);
        product.get().then((doc) => {
            setProducts(processProductFromDB(doc));
        }).catch((error) => {
            console.log("error searching item", error);
        }).finally(() => {
        });
    };
*/
    /*useEffect(() => {
        if (id) {
            getProductByID(id);
        }
    }, [id]);
     */

    return (
        <>
            {
                (products && products.length !== 0) ? (
                    <ItemDetail product={products[0]} component={ItemCount}/>
                ) : (<div className={classes.loading}><CircularProgress size={100}/></div>)
            }
        </>
    )
}
