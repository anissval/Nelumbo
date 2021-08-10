const drawerWidth = 240;

export const mainContainerStyles = theme => {
    return ({
            root : {color: 'black'},
            link: {
                color: 'black',
                textDecoration: 'none',
            },
            toolbarCartRight: {
                display: 'flex',
                justifyContent: 'flex-end',
                textDecoration: 'none',
                listStyle: 'none',
                position: 'fixed',
                top: '1em',
                right: '2em'
            },
        }
    )
}
