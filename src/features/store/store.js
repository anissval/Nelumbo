import React from 'react';
import ImageListItem from '@material-ui/core/ImageListItem';
import {listTheme, storeStyle} from "./store.styles";
import {panaderiaProducts} from "../../mocks/mockData";
import {Grid, ImageListItemBar, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import { ThemeProvider} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => storeStyle(theme));

export const ProductsList = () => {
    const classesStoreStyle = useStyles();
    const itemData = panaderiaProducts;
    return (
        <Grid container item xs={12} spacing={1}>
            {itemData.map((item) => (
                <Grid item xs={12} sm={6} md={6} key={item.title}>
                    <Paper className={classesStoreStyle.paper}>
                        <ImageListItem key={item.img}>
                            <img style={{width: "100%", height: "100%"}}
                                 src={item.img}
                                 alt={item.title}
                                 loading="lazy"
                            />
                            <ThemeProvider theme={listTheme}>
                            <ImageListItemBar
                                              title={item.title}
                                              subtitle={<span>${item.price}</span>}
                                              position="bottom"
                                              actionPosition="left"/>
                            </ThemeProvider>
                        </ImageListItem>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}
