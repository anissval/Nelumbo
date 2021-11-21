import * as React from 'react';
import Stack from '@material-ui/core/Stack';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';
import {useEffect} from "react";

export const SNACKBAR_SEVERITY_ERROR = "error";
export const SNACKBAR_SEVERITY_SUCCESS = "success";
export const SNACKBAR_SEVERITY_WARNING = "warning";
export const SNACKBAR_SEVERITY_INFO = "info";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Snackbars = ({isOpen, message, severity}) => {
    const [open, setOpen] = React.useState(isOpen);

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen]);

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <Snackbar open={open} anchorOrigin={{vertical: "top", horizontal: "center"}}
                      autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
