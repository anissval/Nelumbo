import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import {routes, sessionLoginRoutes, socialMediaRoutes} from "../../navigation/Routes";
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import {mainContainerStyles} from "./MainContainer.styles";
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import PersonIcon from '@material-ui/icons/Person';
import {CartWidget} from "../cartWidget/CartWidget";
import {AppRouter} from "../../navigation/AppRouter";
import {useDispatch, useSelector} from "react-redux";
import {setCategory} from "../../actions/categories";
import {CATEGORY_CARRITO, CATEGORY_PANADERIA, FACEBOOK, INSTAGRAM, WHATSAPP} from "../../utils/constants/constants";
import {AppBar, Box, CssBaseline, Drawer, IconButton, Typography} from "@material-ui/core";

const drawerWidth = 300;
const useStyles = makeStyles((theme) => mainContainerStyles(theme));

export const MainContainer = (props) => {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const category = useSelector((state) => state.nelumboCategory);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const renderMediaButtons = (mediaName) => {
        if (mediaName === FACEBOOK) {
            return <FacebookIcon/>
        } else if (mediaName === INSTAGRAM) {
            return <InstagramIcon/>;
        } else if (mediaName === WHATSAPP) {
            return <WhatsAppIcon/>;
        }
    }

    const drawer = (
        <div>
            <Toolbar>
                <div><img src={process.env.PUBLIC_URL + '/images/nelumboLogo.jpeg'} alt={'Nelumbo Logo'}
                          style={{width: "100%", margin: "10px 0"}}
                          onClick={() => dispatch(setCategory(CATEGORY_PANADERIA))}
                /></div>
                <Divider/></Toolbar>
            <Divider/>
            <List>
                {routes.map((routeItem, index) => (
                    <Link to={routeItem.path} className={classes.link} key={`link-${routeItem.text}`} data-testid = {`category-${routeItem.text}`}>
                        <ListItem button key={`listItem-${routeItem.text}`}
                                  onClick={() => dispatch(setCategory(routeItem.text))}>
                            <ListItemText primary={routeItem.text} key={`listItemText-${routeItem.text}`}/>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider/>
            <List>
                {sessionLoginRoutes.map((routeItem, index) => (
                    <Link to={routeItem.path} className={classes.link} key={`link-${routeItem.text}`}>
                        <ListItem button key={`listItem-${routeItem.text}`}
                                  onClick={() => dispatch(setCategory(routeItem.text))}>
                            <ListItemIcon key={`listItemIcon-${routeItem.text}`}>
                                <PersonIcon key={`PersonIcon-${routeItem.text}`}/>
                            </ListItemIcon>
                            <ListItemText primary={routeItem.text} key={`listItemText-${routeItem.text}`}/>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider/>
            <List>
                {socialMediaRoutes.map((item, index) => (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className={classes.link}
                       key={`a-${item.text}`}>
                        <ListItem
                            button key={`listItem-${item.text}`}>
                            <ListItemIcon key={`listItemIcon-${item.text}`}>
                                {renderMediaButtons(item.text)}
                            </ListItemIcon>
                            <ListItemText primary={item.text} key={`listItemText-${item.text}`}/>
                        </ListItem>
                    </a>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: {sm: `${drawerWidth}px`},
                }}
            >
                <Toolbar style={{backgroundColor: '#c5e1a5', color: 'black'}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {category.category}
                    </Typography>
                    <Link to={{pathname: '/Cart'}}
                          onClick={() => dispatch(setCategory(CATEGORY_CARRITO))}
                          className={classes.toolbarCartRight}><CartWidget/></Link>

                </Toolbar>
            </AppBar>
            <Box component="nav"
                 sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                 aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: false,
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <AppRouter/>
            </Box>
        </Box>
    );
}

MainContainer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
