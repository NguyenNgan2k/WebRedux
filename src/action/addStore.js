import { GET_LIST_POST, GET_LIST_POST_SUCCESS, ADD_STORE, DELETE_STORE,UPDATE_AMOUNT } from "../constant";
export const getListPost = (payload) => {
    return {
        type: GET_LIST_POST,
        payload,
    };
};
export const getListPostSuccess = (payload) => {
    return {
        type: GET_LIST_POST_SUCCESS,
        payload,
    };
};
export const add_store = (product) => {
    return {
        type: ADD_STORE,
        product
    }
};
export const delete_store = (id) => {
    return {
        type: DELETE_STORE,
        id
    }
};
export const update_amount = (arrow) => {
    return {
        type: UPDATE_AMOUNT,
        arrow
    }
};