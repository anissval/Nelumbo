import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import {storeStyle} from "./store.styles";
import {panaderiaProducts} from "../../mocks/mockData";
import {Grid, Paper} from "@material-ui/core";

const useStyles = makeStyles((theme) => storeStyle(theme));

export const ProductsList = () => {
    const classes = useStyles();
    const itemData = panaderiaProducts;
    return (
        <Grid container item xs={12} spacing={1}>
            {itemData.map((item) => (
                <Grid item xs={12} sm={6} md={6} key={item.title}>
                    <Paper className={classes.paper}>
                        <ImageListItem key={item.img}>
                            <img style={{width: "100%", height: "100%"}}
                                 src={item.img}
                                 alt={item.title}
                                 loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.title}
                                subtitle={<span>${item.price}</span>}
                                position="bottom"
                            />
                        </ImageListItem>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}
