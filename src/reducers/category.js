import {
    CATEGORY_ARTESANIAS, CATEGORY_CARRITO, CATEGORY_INICIAR_SESSION,
    CATEGORY_PANADERIA,
    CATEGORY_PASTELERIA,
    CATEGORY_VEGANO,
    CATEGORY_VEGETARIANO
} from "../utils/constants/constants";

const initialState = {
    category: CATEGORY_PANADERIA
}
export const category = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_PANADERIA :
            return {
                ...state,
                category: CATEGORY_PANADERIA
            }
        case CATEGORY_PASTELERIA :
            return {
                ...state,
                category: CATEGORY_PASTELERIA
            }
        case CATEGORY_VEGANO :
            return {
                ...state,
                category: CATEGORY_VEGANO
            }
        case CATEGORY_VEGETARIANO :
            return {
                ...state,
                category: CATEGORY_VEGETARIANO
            }
        case CATEGORY_ARTESANIAS :
            return {
                ...state,
                category: CATEGORY_ARTESANIAS
            }
        case CATEGORY_CARRITO :
            return {
                ...state,
                category: CATEGORY_CARRITO
            }
        case CATEGORY_INICIAR_SESSION :
            return {
                ...state,
                category: CATEGORY_INICIAR_SESSION
            }
        default:
            return state;
    }
}

const addToCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART_SUCCESS' :
            state.isAddedToCart = !state.isAddedToCart; //original object altered
            return state;
        default:
            return state;
    }
}
export default addToCartReducer;
