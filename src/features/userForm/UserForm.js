import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/styles";
import {userFormStyles} from "./UserForm.styles";
import {useFirebase, useFirestore, useFirestoreConnect} from "react-redux-firebase";
import {Button, TextField} from "@material-ui/core";
import {ADMIN, CATEGORY_USER, ORDER_CONFIRMATION} from "../../utils/constants/constants";
import {clearCartContent} from "../../actions/cartContent";
import {useHistory} from "react-router-dom";
import {setCategory} from "../../actions/categories";
import {processDataFromDB, processProductFromDB} from "../../utils/Utils";

const useStyles = makeStyles((theme) => userFormStyles(theme));

export const UserForm = () => {
    const auth = useSelector(state => state.firebase.auth);
    const categorySelected = useSelector((state) => state.nelumboCategory);
    const userFormClasses = useStyles();
    const firebase = useFirebase();
    const firestore = useFirestore();
    const [activeUser, setActiveUser] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const userData = useSelector((state) => state.firestore.data.currentUser);
    const [userName, setUserName] = useState(userData? userData.name : "");
    const [userEmail, setUserEmail] = useState(userData? userData.email : "");
    const [userAddress, setUserAddress] = useState(userData? userData.address : "");
    const [userPhone, setUserPhone] = useState(userData? userData.address : "");
    const [userId, setUserId] = useState(userData? userData.id : null);

    useEffect(()=> {
        setUserName(userData?userData.name: "");
        setUserEmail(userData?userData.email: "");
        setUserAddress(userData?userData.address: "");
        setUserPhone(userData?userData.phone: "");
        setUserId(userData?userData.id: null);
    }, []);
    const signOut = () => {
        firebase
            .logout()
            .then(() => setActiveUser(false));
    };

    const handleAddOrUpdateUserInfo = () => {
        const userInfo = {
            name: userName,
            email: userEmail,
            address: userAddress,
            phone: userPhone
        }
        const users = firestore.collection('users');
        const user = users.where("email", "==", userEmail);
        user.get().then((querySnapshot) => {
            const userData = processDataFromDB(querySnapshot);
            if (userData !== undefined) {
                setUserId(userData[0].id);
                updateUser(userData[0].id, userInfo);
            } else {
                addNewUser(userData[0]);
            }
        }).catch((error) => {
            console.log("error searching item", error);
        }).finally(() => {
        });
    }
    const updateUser = (id, userInfo) => {
        const userToUpdate = firestore.collection('users').doc(id);
        userToUpdate.update(userInfo).then(() => {
            console.log("Document successfully updated!");
        }).catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    const addNewUser = (userData) => {
        // Add a new document with a generated id.
        firestore.collection("users").add(userData)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                setUserId(docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    const isUserRegistered= () => {
        const users = firestore.collection('users');
        const user = users.where("email", "==", userEmail);
        user.get().then((querySnapshot) => {
            const userData = processDataFromDB(querySnapshot);
            if (userData !== undefined) {
                setUserId(userData[0].id);
                setUserEmail(userData[0].email);
                setUserName(userData[0].name);
                setUserAddress(userData[0].address);
                setUserPhone(userData[0].phone);
            } else {
                addNewUser(userData[0]);
            }
        }).catch((error) => {
            console.log("error searching item", error);
        }).finally(() => {
        });
    }

    const handleSubmit = () => {

    }
    const handleAddressChange = (e) => {
        e.preventDefault();
        setUserAddress(e.target.value);
    }
    const handlePhoneChange = (e) => {
        e.preventDefault();
        setUserPhone(e.target.value);
    }
    const goAdminBoard = () => {
        dispatch(setCategory(ADMIN));
        history.push('/Admin');
    }

    const handleCheckout = () => {
        //crear una orden de compra con los detalles del pedido.cuando obtenga el id,
        //navegar y mostrar id orden de compra y detalles si es necesario
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
                    value={userName}
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
                    value={userEmail}
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
                    value={userAddress}
                    onChange={(e) => {
                        handleAddressChange(e)
                    }}
                />
                <p/>
                <TextField
                    required
                    variant="standard"
                    label="Telefono"
                    value={userPhone}
                    color={"secondary"}
                    onChange={(e) => {
                        handlePhoneChange(e)
                    }}
                />
                <p/>
                {(categorySelected.category === "CARRITO") ? (
                    <Button type={"submit"} variant="outlined" size="large" color="secondary"
                            onClick={() => {
                                handleCheckout()
                            }}>CONFIRMAR PEDIDO</Button>
                ) : (
                    <Button variant="outlined" size="large" color="secondary" onClick={(e) => {
                        handleAddOrUpdateUserInfo("anita@gmail.com")
                    }}>ACTUALIZAR INFORMACION</Button>
                )}
            </form>
            {(auth.email === 'nelumbojujuy@gmail.com') &&
            <Button variant="outlined" size="large" color="secondary" onClick={() => {
                goAdminBoard()
            }}>ADMINISTRAR</Button>}
        </>
    )

}
