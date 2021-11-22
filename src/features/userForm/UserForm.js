import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useFirebase, useFirestore, useFirestoreConnect} from "react-redux-firebase";
import {Button, CircularProgress, TextField} from "@material-ui/core";
import {
    ADMIN, ADMIN_BUTTON_TEXT, CATEGORY_CARRITO,
    CATEGORY_USER, CONFIRM_ORDER_BUTTON_TEXT, LOGOUT_TITLE,
    ORDER_CONFIRMATION, SAVE_BUTTON_TEXT,
    UPDATE_BUTTON_TEXT, USER_DATA_TITLE, VARIANT_OUTLINED, VARIANT_STANDARD
} from "../../utils/constants/constants";
import {
    calculateTotalAmount,
    setFinalOrderData,
    setOrderID
} from "../../actions/cartContent";
import {useHistory} from "react-router-dom";
import {setCategory} from "../../actions/categories";
import {processDataFromDB} from "../../utils/Utils";
import Stack from "@material-ui/core/Stack";

export const UserForm = () => {
    const auth = useSelector(state => state.firebase.auth);
    const cartContent = useSelector((state) => state.nelumboCartContent.cartContent);
    const totalAmount = useSelector((state) => state.nelumboCartContent.totalAmount);
    const categorySelected = useSelector((state) => state.nelumboCategory);
    const [userEmail, setUserEmail] = useState(auth ? auth.email : "");
    const [isEditing, setIsEditing] = useState(false);
    const [updateButtonText, setUpdateButtonText] = useState(UPDATE_BUTTON_TEXT);
    const [fieldVariant, setFieldVariant] = useState(VARIANT_STANDARD);
    useFirestoreConnect([{
        collection: 'users',
        where: [['email', '==', userEmail]],
        storeAs: 'currentUser',
    }]);
    const currentUser = useSelector(state => state.firestore.ordered.currentUser);
    const currentUserAdded = (currentUser && (currentUser.length !== 0));
    const firebase = useFirebase();
    const firestore = useFirestore();
    const dispatch = useDispatch();
    const history = useHistory();
    const [userName, setUserName] = useState(currentUserAdded ? currentUser[0].name : auth.displayName);
    const [userAddress, setUserAddress] = useState(currentUserAdded ? currentUser[0].address : "");
    const [userPhone, setUserPhone] = useState(currentUserAdded ? currentUser[0].phone : "");
    const [userRole, setUserRole] = useState(currentUserAdded ? currentUser[0].role : '');
    useEffect(() => {
        if (currentUserAdded) {
            setUserName(currentUser[0].name);
            setUserAddress(currentUser[0].address);
            setUserPhone(currentUser[0].phone);
            setUserRole(currentUser[0].role);
            setUserEmail(currentUser[0].email);
        }
    }, [currentUser, isEditing]);

    const signOut = () => {
        firebase
            .logout()
            .then(() => signOutMessage());
    };

    const signOutMessage = () => {
        const message = "GRACIAS POR VISITARNOS";
        console.log("Usuario deslogeado", message);
    }

    const handleUpdateUserInfo = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            setFieldVariant(VARIANT_OUTLINED);
            setUpdateButtonText(UPDATE_BUTTON_TEXT);
            const userInfo = {
                name: userName,
                email: userEmail,
                address: userAddress,
                phone: userPhone,
                role: 'buyer'
            }
            const users = firestore.collection('users');
            const user = users.where("email", "==", userEmail);
            user.get().then((querySnapshot) => {
                const userData = processDataFromDB(querySnapshot);
                if (userData !== undefined) {
                    updateUser(userData[0].id, userInfo);
                } else {
                    addNewUser(userInfo);
                }
            }).catch((error) => {
                console.log("error searching item", error);
            }).finally(() => {

            });
        } else {
            setUpdateButtonText(SAVE_BUTTON_TEXT);
            setFieldVariant(VARIANT_STANDARD);
        }
    }

    const updateUser = (id, userInfo) => {
        const userToUpdate = firestore.collection('users').doc(id);
        userToUpdate.update(userInfo).then(() => {
            console.log("Document successfully updated!");
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

    const addNewUser = (userData) => {
        firestore.collection("users").add(userData)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    const handleAddressChange = (e) => {
        e.preventDefault();
        setUserAddress(e.target.value);
    }

    const handlePhoneChange = (e) => {
        e.preventDefault();
        setUserPhone(e.target.value);
    }

    const goToAdminBoard = () => {
        dispatch(setCategory(ADMIN));
        history.push('/Admin');
    }

    const goToOrderConfirmation = () => {
        dispatch(setCategory(ORDER_CONFIRMATION));
        history.push('/OrderConfirmation');
    }

    const handleCheckout = (e) => {
        e.preventDefault();
        confirmOrder();
    }

    const confirmOrder = () => {
        dispatch(calculateTotalAmount());
        let itemsUpdated = [];
        const cartItems = cartContent.map((content) => {
            const newItem = {
                id: content.item.id,
                title: content.item.title,
                price: content.item.price,
                quantity: content.quantity
            }
            itemsUpdated = [...itemsUpdated, newItem];
            return (newItem);
        });
        const newOrder = {
            buyer: {name: userName, phone: userPhone, email: userEmail},
            items: cartItems,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            total: totalAmount
        }
        persistNewOrderIntoDataBase(newOrder, cartItems);
    };

    const persistNewOrderIntoDataBase = (newOrder, cartItems) => {
        const orders = firestore.collection('orders');
        orders.add(newOrder).then(({id}) => {
            dispatch(setFinalOrderData(newOrder));
            dispatch(setOrderID(id));
            updateStockIntoDataBase(cartItems);
            goToOrderConfirmation();
        }).catch(error => {
            console.log(error);
        }).finally();
    }

    const updateStockIntoDataBase = (items) => {
        const batch = firestore.batch();
        items.forEach((entry) => {
            const itemFound = cartContent.filter((content) => (content.item.id === entry.id));
            const oldStock = itemFound[0].item.stock;
            const updateItem = firestore.collection('productos').doc(entry.id);
            const newStock = (oldStock - entry.quantity);
            batch.update(updateItem, {stock: newStock});
        });
        batch.commit().then(() => {
            console.log("Stocks actualizados.");
        }).catch((error) => {
            console.log(error)
        })
    }

    const CloseSessionButton = () => {
        return (<Button variant="contained" size="medium" color="primary" onClick={() => {
            signOut()
        }}>{LOGOUT_TITLE}</Button>)
    }

    const UpdateUserInfoButton = () => {
        return (
            <Button variant="contained" size="medium" color="primary" onClick={(e) => {
                handleUpdateUserInfo()
            }}>{updateButtonText}</Button>
        )
    }

    const ConfirmOrderButton = () => {
        return (
            (categorySelected.category === CATEGORY_CARRITO) &&
            <Button type={"submit"} variant="contained" size="medium"
                    color="primary">{CONFIRM_ORDER_BUTTON_TEXT}</Button>)
    }

    const AdminButton = () => {
        return (((userRole === 'admin') && categorySelected.category === CATEGORY_USER) &&
            <Button variant="contained" size="medium" color="primary" onClick={() => {
                goToAdminBoard()
            }}>{ADMIN_BUTTON_TEXT}</Button>)
    }
    return (
        <>
            {(currentUser) ? (
                <>
                    <Stack  alignItems="flex-start" justifyContent="center" direction="column" spacing={2}> <CloseSessionButton/></Stack>
                    <p/>
                    <form onSubmit={(e) => {
                        handleCheckout(e)
                    }}>
                        <label>{USER_DATA_TITLE}</label>
                        <p/>
                        <TextField
                            required
                            variant={fieldVariant}
                            label="Nombre"
                            value={userName}
                            color={"secondary"}
                            InputProps={{
                                readOnly: !isEditing,
                            }}
                        />
                        <p/>
                        <TextField
                            required
                            variant={fieldVariant}
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
                            variant={fieldVariant}
                            label="Domicilio"
                            color={"secondary"}
                            value={userAddress}
                            onChange={(e) => {
                                handleAddressChange(e)
                            }}
                            InputProps={{
                                readOnly: !isEditing,
                            }}
                        />
                        <p/>
                        <TextField
                            required
                            variant={fieldVariant}
                            label="Telefono"
                            value={userPhone}
                            color={"secondary"}
                            onChange={(e) => {
                                handlePhoneChange(e)
                            }}
                            InputProps={{
                                readOnly: !isEditing,
                            }}
                        />
                        <p/>
                        <Stack alignItems="flex-start" justifyContent="center" direction="column" spacing={2}>
                            <UpdateUserInfoButton/>
                            <ConfirmOrderButton/>
                            <AdminButton/>
                        </Stack>
                    </form>
                </>
            ) : (<CircularProgress/>)
            }
        </>
    )
}

