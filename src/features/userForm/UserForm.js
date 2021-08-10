import React from "react";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/styles";
import {userFormStyles} from "./UserForm.styles";

const useStyles = makeStyles((theme) => userFormStyles(theme));

export const UserForm = () => {
    const auth = useSelector(state => state.firebase.auth);
    const categorySelected = useSelector((state) => state.nelumboCategory);
    const userFormClasses = useStyles();
    const handleSubmit = () => {

    }
    const handleChange = () => {

    }

    return (
        <form onSubmit={() => {handleSubmit()}} className={userFormClasses.root}>
            <p/><label>
                nombre de usuario registrado :
                <input type="text" value={auth.displayName} onChange={() => {handleChange()}}/>
            </label>
            <p/><label>
                email registrado :
                <input type="text" value={auth.email} onChange={() => {handleChange()}}/>
            </label>
            <p/><label>
                domicilio :
                <input type="text" value={"lalal 123"} onChange={() => {handleChange()}}/>
            </label>
            <p/><label>
                telefono :
                <input type="text" value={"123456789"} onChange={() => {handleChange()}}/>
            </label>
            <p/>
            {(categorySelected.category === "CARRITO")? (<input type="submit" value="Confirmar Pedido"/>): (<input type="submit" value="Actualizar informacion"/>)}
        </form>)
}
