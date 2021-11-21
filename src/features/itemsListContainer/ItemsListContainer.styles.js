import {createTheme} from '@material-ui/core/styles'

export const itemsListContainerStyles = theme => {
    return ({
        root: {
            color: 'black',
        },
        imageList: {
            width: 500,
            height: 450,
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
        paper: {
            // padding: theme.spacing(3),
            textAlign: 'center',
            color: 'black',
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
};

export const listTheme = createTheme({
    components: {
        MuiImageListItemBar: {
            styleOverrides: {
                titleWrap: {
                    color: 'black',
                    backgroundColor: 'white',
                    opacity: '0.5'
                },
            },
        },
    },
});
