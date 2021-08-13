import {
    CATEGORY_ARTESANIAS, CATEGORY_CARRITO, CATEGORY_USER,
    CATEGORY_PANADERIA,
    CATEGORY_PASTELERIA,
    CATEGORY_VEGANO,
    CATEGORY_VEGETARIANO, ORDER_CONFIRMATION
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
        case CATEGORY_USER :
            return {
                ...state,
                category: CATEGORY_USER
            }
        case ORDER_CONFIRMATION :
            return {
                ...state,
                category: ORDER_CONFIRMATION
            }
        default:
            return state;
    }
}

