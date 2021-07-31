import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import nelumboLogo from '../../images/nelumbo.jpeg';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import {mainContainerStyles} from "./MainContainer.styles";
import {Link} from "react-router-dom";
import {routes, sessionLoginRoutes} from "../../navigation/Routes";
import {socialMediaRoutes} from "../../navigation/Routes";
import {AppRouter} from "../../navigation/AppRouter";
import {CartWidget} from "../cartWidget/CartWidget";
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => mainContainerStyles(theme));
export const MainContainer = (props) => {
    const {window} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [category, setCategory] = useState('PANADERIA');
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleOnclick = (category) => {
        setCategory(category);
    }

    const drawer = (
        <div>
            <div className={classes.toolbar}><img src={nelumboLogo} alt={'nelumbo logo'}
                                                  style={{width: "100%", margin: "30px 0"}}/></div>
            <Divider/>
            <List>
                {routes.map((routeItem, index) => (
                    <Link to={routeItem.path} className={classes.link}>
                        <ListItem button key={routeItem.text} onClick={() => handleOnclick(routeItem.text)}>
                            <ListItemText primary={routeItem.text}/>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider/>
            <List>
                {sessionLoginRoutes.map((routeItem, index) => (
                    <Link to={routeItem.path} className={classes.link}>
                        <ListItem button key={routeItem.text} onClick={() => handleOnclick(routeItem.text)}>
                            <ListItemIcon>
                                <PersonIcon/>
                            </ListItemIcon>
                            <ListItemText primary={routeItem.text}/>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider/>
            <List>
                {socialMediaRoutes.map((item, index) => (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className={classes.link}><ListItem
                        button key={item.text}>
                        <ListItemIcon>{
                            index % 2 === 0 ? <FacebookIcon/> : <InstagramIcon/>}
                        </ListItemIcon>
                        <ListItemText primary={item.text}/>
                    </ListItem>
                    </a>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {category}
                    </Typography>
                    <Link to={{pathname: '/Cart'}}
                          onClick={() => handleOnclick('CARRITO')} className={classes.toolbarCartRight}><CartWidget/></Link>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <AppRouter/>
            </main>
        </div>
    );
}

MainContainer.propTypes =
    {
        /**
         * Injected by the documentation to work in an iframe.
         * You won't need it on your project.
         */
        window: PropTypes.func,
    }
;
