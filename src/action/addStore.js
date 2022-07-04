export const add_store = (item) => {
    return {
        type: "ADD_STORE",
        payload: {
            id: item.id,
            title: item.title,
            price: item.price,
            amount: item.amount || 1
        }
    }
};
export const delete_store = (id) => {
    return {
        type: "DELETE_STORE",
        id
      
    }
};
export const update_amount = (arrow) => {
    return {
        type: "UPDATE_AMOUNT",
        arrow
    }
};