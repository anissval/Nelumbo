export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_BY_ID = "GET_PRODUCTS_BY_ID";
export const GET_PRODUCTS_BY_CATEGORY = "GET_PRODUCTS_BY_CATEGORY";

export const getProducts = () => {

    return {
        type: GET_PRODUCTS
    }
}
export const getProductsByID = (id) => {
    let payload = {
        id: id
    }
    return {
        type: GET_PRODUCTS_BY_ID,
        payload
    }
}

export const getProductsByCategory = (category) => {
    let payload = {
        category:category
    }
    return {
        type: GET_PRODUCTS_BY_CATEGORY,
        payload
    }
}
