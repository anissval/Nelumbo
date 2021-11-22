import React from 'react';
import ImageListItem from '@material-ui/core/ImageListItem';
import {CircularProgress, Grid, ImageListItemBar, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {ThemeProvider} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {itemsListContainerStyles, listTheme} from "./ItemsListContainer.styles";
import {useFirestoreConnect} from "react-redux-firebase";

const useStyles = makeStyles((theme) => itemsListContainerStyles(theme));

export const ItemsListContainer = () => {
    const classesStoreStyle = useStyles();
    const selectedCategory = useSelector((state) => state.nelumboCategory);
    useFirestoreConnect([{collection: 'productos', storeAs: "listOfProducts",},]);
    const productsData = useSelector(state => state.firestore.ordered.listOfProducts) || [];
    const productByCategory = productsData.filter((product) => product.category === selectedCategory.category);

    return (
        (productByCategory && productByCategory.length !== 0) ?
            (<Grid container item xs={12} spacing={1}>
                {
                    productByCategory.map((item) => {
                        return (
                            <Grid item xs={12} sm={6} md={6} key={`grid-${item.id}`}>
                                <Paper className={classesStoreStyle.paper}>
                                    <Link to={{pathname: `/item/${item.id}`}}>
                                        <ImageListItem key={`imgListItem-${item.id}`}> <img
                                            style={{width: "100%", height: "100%"}}
                                            src={item.img}
                                            alt={item.title}
                                            loading="lazy"
                                            key={`img-${item.id}`}
                                        />
                                            \ <ThemeProvider theme={listTheme}>
                                                <ImageListItemBar
                                                    title={item.title}
                                                    subtitle={<span>${item.price}</span>}
                                                    position="bottom"
                                                    actionPosition="left"
                                                    key={`imgListItemBar-${item.id}`}
                                                />
                                            </ThemeProvider>
                                        </ImageListItem>
                                    </Link>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>) : (<CircularProgress color="secondary" className={classesStoreStyle.progress}/>)
    )
}
