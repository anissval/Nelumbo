export const setCategory = (category) => {
    return {
        type : category
    }
}

export function itemsRequest(bool,startIndex,endIndex) {
    let payload = {
        isLoading: bool,
        startIndex,
        endIndex
    }
    return {
        type: "ITEMS_REQUEST",
        payload
    }
}
export function itemsRequestSuccess(bool) {
    return {
        type: "ITEMS_REQUEST_SUCCESS",
        isLoading: bool,
    }
}
