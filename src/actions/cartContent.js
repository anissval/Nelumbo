export const ADD_ITEM_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_ITEM_INTO_CART = "UPDATE_ITEM_INTO_CART";
export const CALCULATE_TOTAL_AMOUNT = "CALCULATE_TOTAL_AMOUNT";
export const CALCULATE_TOTAL_ITEMS = "CALCULATE_TOTAL_ITEMS";
export const CLEAR_CART_CONTENT = "CLEAR_CART_CONTENT";
export const FINAL_ORDER_DATA = "FINAL_ORDER_DATA";
export const ORDER_ID = "ORDER_ID";

export const addItemToCart = (item, quantity) => {
    let payload = {
        item: item,
        quantity: quantity
    }
    return {
        type: ADD_ITEM_TO_CART,
        payload
    }
}

export const updateItemToCart = (item, quantity) => {
    let payload = {
        item: item,
        quantity: quantity
    }
    return {
        type: UPDATE_ITEM_INTO_CART,
        payload
    }
}


export const removeItemFromCart = (itemID) => {
    let payload = {
        id: itemID
    }
    return {
        type: REMOVE_FROM_CART,
        payload
    }
}
export const calculateTotalAmount = () => {
    return {
        type: CALCULATE_TOTAL_AMOUNT
    }
}

export const calculateTotalItems = () => {
    return {
        type: CALCULATE_TOTAL_ITEMS
    }
}

export const setFinalOrderData = (orderData) => {
    let payload = {
        orderData: orderData
    }
    return {
        type: FINAL_ORDER_DATA,
        payload
    }
}
export const setOrderID = (id) => {
    let payload = {
        orderId: id
    }
    return {
        type: ORDER_ID,
        payload
    }
}

export const clearCartContent = () => {
    return {
        type: CLEAR_CART_CONTENT,
    }
}
