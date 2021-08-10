import React from 'react';
import ImageListItem from '@material-ui/core/ImageListItem';
import {storeProducts} from "../../mocks/mockData";
import {Grid, ImageListItemBar, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {ThemeProvider} from '@material-ui/core/styles';
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {itemsListContainerStyles, listTheme} from "./ItemsListContainer.styles";

const useStyles = makeStyles((theme) => itemsListContainerStyles(theme));

export const ItemsListContainer = () => {
    const classesStoreStyle = useStyles();
    const itemData = storeProducts;
    const selectedCategory = useSelector((state) => state.nelumboCategory);
    const productByCategory = itemData.filter((product) => product.category === selectedCategory.category);

    return (
        <Grid container item xs={12} spacing={1}>
            {productByCategory.map((item) => (
                <Grid item xs={12} sm={6} md={6} key={`grid-${item.id}`}>
                    <Paper className={classesStoreStyle.paper}>
                        <Link to={{pathname: `/item/${item.id}`}}>
                            <ImageListItem key={`imgListItem-${item.id}`}>
                                <img style={{width: "100%", height: "100%"}}
                                     src={process.env.PUBLIC_URL + `/images/${item.img}`}
                                     alt={item.title}
                                     loading="lazy"
                                     key={`img-${item.id}`}
                                />
                                <ThemeProvider theme={listTheme}>
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
            ))}
        </Grid>
    );
}
