import {
    ADD_ITEM_TO_CART,
    CALCULATE_TOTAL_AMOUNT, CALCULATE_TOTAL_ITEMS, CLEAR_CART_CONTENT,
    REMOVE_FROM_CART,
    UPDATE_ITEM_INTO_CART
} from "../actions/cartContent";

const initialState = {
    cartContent: [],
    totalAmount: 0,
    totalItems:0
}

export const cartContent = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART :
           const cartContentUpdated_add = [...state.cartContent, action.payload]
            return {
                ...state,
                cartContent: cartContentUpdated_add
            }
        case UPDATE_ITEM_INTO_CART :
            const oldItemRemovedFromCart = state.cartContent.filter((entry) => {
                return entry.item.id !== action.payload.item.id;
            });
            const cartContentUpdated_update = [...oldItemRemovedFromCart, action.payload]
            return {
                ...state,
                cartContent: cartContentUpdated_update
            }
        case REMOVE_FROM_CART :
            const cartContentItemRemoved = state.cartContent.filter((entry) => {
                return entry.item.id !== action.payload.id;
            });
            return {
                ...state,
                cartContent: cartContentItemRemoved
            }
        case CALCULATE_TOTAL_AMOUNT :
            let totalAmountUpdated = 0;
                state.cartContent.forEach(product => {
                totalAmountUpdated = totalAmountUpdated + product.quantity * product.item.price;
            });
            return {
                ...state,
                totalAmount: totalAmountUpdated
            }
        case CALCULATE_TOTAL_ITEMS :
            let totalItemsUpdated = 0;
            state.cartContent.forEach(product => {
                totalItemsUpdated = totalItemsUpdated + product.quantity;
            });
            return {
                ...state,
                totalItems: totalItemsUpdated
            }
        case CLEAR_CART_CONTENT :
            return {
                ...state,
                cartContent: [],
                totalAmount: 0,
                totalItems:0
            }
        default:
            return state;
    }
}
