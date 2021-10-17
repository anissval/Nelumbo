import React, {useState} from "react";
import {useFirebase, useFirestore} from "react-redux-firebase";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {SNACKBAR_SEVERITY_SUCCESS, Snackbars} from "../../snackBars/snackBars";

export const Admin = () => {
    const firebase = useFirebase()
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [categorySelected, setCategorySelected] = useState('PANADERIA');
    const firestore = useFirestore()
    const [isOpen, setIsOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const createNewProduct = () => {
        const newProduct = {
            title: title, description: description,
            price: price, img: imageUrl, category: categorySelected
        };
        const xx = firestore.collection('productos').add(newProduct).then(({id}) => {
            const orderID = id;
            handleSnackBar(true, 'Publicacion cargada exitosamente', SNACKBAR_SEVERITY_SUCCESS);
        });
    }
    const uploadProductImage = async () => {
        if (image == null)
            return;
        const ref = firebase.storage().ref(`/images/${image.name}`);
        const snapshot = await ref.put(image);
        snapshot.ref.getDownloadURL().then((imgUrl) => {
            setImageUrl(imgUrl);
            handleSnackBar(true, 'Foto subida exitosamente', SNACKBAR_SEVERITY_SUCCESS);
        });
    }

    const handleSnackBar = (isOpen, message, severity) => {
        setSnackBarMessage(message);
        setSeverity(severity);
        setIsOpen(isOpen);
    }

    const handleCancelNewProduct = () => {
        setTitle('');
        setDescription('');
        setCategorySelected('');
        setPrice(0);
        setImageUrl('');
    }

    return (<div>
            <Snackbars isOpen={isOpen} message={snackBarMessage} severity={severity}/>
            <center>
                <p/>
                <TextField
                    required
                    type={'file'}
                    variant="standard"
                    label="Imagen"
                    color={"secondary"}
                    onChange={(e) => {
                        setImage(e.target.files[0])
                    }}
                />
                <Button variant="outlined" size="large" color="secondary"
                        onClick={() => {
                            uploadProductImage()
                        }}>SUBIR FOTO</Button>
            </center>
            <div><label>AGREGAR PUBLICACION</label>
                <p/>
                <TextField
                    required
                    variant="standard"
                    label="Nombre"
                    value={title}
                    color={"secondary"}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <p/>
                <TextField
                    required
                    variant="standard"
                    label="Descripcion"
                    value={description}
                    color={"secondary"}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <p/>
                <TextField
                    required
                    type={'number'}
                    variant="standard"
                    label="Precio"
                    value={price}
                    color={"secondary"}
                    onChange={(e) => setPrice(e.target.value)}
                /><p/>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="quantity-select-standard-label">Categoria</InputLabel>
                <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={categorySelected}
                    label="Categoria"
                    onChange={(e) => setCategorySelected(e.target.value)}>
                    <MenuItem value={'PANADERIA'}>PANADERIA</MenuItem>
                    <MenuItem value={'PASTELERIA'}>PASTELERIA</MenuItem>
                    <MenuItem value={'VEGANO'}>VEGANO</MenuItem>
                    <MenuItem value={'VEGETARIANO'}>VEGETARIANO</MenuItem>
                    <MenuItem value={'ARTESANIAS'}>ARTESANIAS</MenuItem>
                </Select>
                </FormControl>
                <p/>
                <TextField
                    required
                    variant="standard"
                    label="Url de la imagen"
                    value={imageUrl}
                    color={"secondary"}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <p/>
                {(imageUrl) && <img src={imageUrl} alt={'imageUrl'}/>}
                <p/>
                <Button variant="outlined" size="large" color="secondary"
                        onClick={() => {
                            createNewProduct()
                        }}>SUBIR PUBLICACION</Button>
                <Button variant="outlined" size="large" color="secondary"
                        onClick={() => {
                            handleCancelNewProduct()
                        }}>CANCELAR</Button>
            </div>
        </div>
    );
}
