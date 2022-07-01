export const addstore = (item) => {
    return {
        type: "ADD_STORE",
        payload: {
            id: item.id,
            title: item.title,
            price: item.price
        }
    }
};
export const deletestore = (id) => {
    return {
        type: "DELETE_STORE",
        payload: id
      
    }
};