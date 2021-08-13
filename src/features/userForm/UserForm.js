import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/styles";
import {userFormStyles} from "./UserForm.styles";
import {useFirebase} from "react-redux-firebase";
import {Button, TextField} from "@material-ui/core";
import {CATEGORY_USER, ORDER_CONFIRMATION} from "../../utils/constants/constants";
import {clearCartContent} from "../../actions/cartContent";
import {useHistory} from "react-router-dom";
import {setCategory} from "../../actions/categories";

const useStyles = makeStyles((theme) => userFormStyles(theme));

export const UserForm = () => {
    const auth = useSelector(state => state.firebase.auth);
    const categorySelected = useSelector((state) => state.nelumboCategory);
    const userFormClasses = useStyles();
    const firebase = useFirebase();
    const [activeUser, setActiveUser] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();

    const signOut = () => {
        firebase
            .logout()
            .then(() => setActiveUser(false));
    };

    const handleSubmit = () => {

    }
    const handleChange = () => {

    }

    const handleCheckout = () => {
        dispatch(clearCartContent());
        dispatch(setCategory(ORDER_CONFIRMATION));
        history.push('/OrderConfirmation');
    }

    return (
        <>
            {(categorySelected.category === CATEGORY_USER) &&
            <Button variant="outlined" size="large" color="secondary" onClick={() => {
                signOut()
            }}>CERRAR SESSION </Button>}
            <form onSubmit={() => {
                handleSubmit()
            }} className={userFormClasses.root}>
                <label>DATOS DEL USUARIO</label>
                <p/>
                <TextField
                    required
                    variant="standard"
                    label="Nombre"
                    value={auth.displayName}
                    color={"secondary"}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <p/>
                <TextField
                    required
                    variant="standard"
                    label="Email"
                    value={auth.email}
                    color={"secondary"}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <p/>
                <TextField
                    required
                    variant="standard"
                    label="Domicilio"
                    color={"secondary"}
                    onChange={handleChange}
                />
                <p/>
                <TextField
                    required
                    variant="standard"
                    label="Telefono"
                    color={"secondary"}
                    onChange={handleChange}
                />
                <p/>
                {(categorySelected.category === "CARRITO") ? (
                    <Button type={"submit"} variant="outlined" size="large" color="secondary"
                            onClick={() => {
                                handleCheckout()
                            }}>CONFIRMAR PEDIDO</Button>
                ) : (
                    <Button variant="outlined" size="large" color="secondary" onClick={() => {
                    }}>ACTUALIZAR INFORMACION</Button>
                )}
            </form>
        </>
    )

}
