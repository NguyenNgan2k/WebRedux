import { values } from "lodash";
import { GET_LIST_POST, GET_LIST_POST_SUCCESS, ADD_STORE, DELETE_STORE,UPDATE_AMOUNT, SUB_AMOUNT, GET_LIST_POST_FAIL,ADD_POST, GET_INFO, EDIT_INFO, DELETE_PRODUCT,ADD_PAYMENT, DELETE_PAYMENT, CLEAR_PAYMENT, UPDATE_PAYMENT} from "../constant";
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
export const getListPostFail = (error) => {
    return {
        type: GET_LIST_POST_FAIL,
        error,
    };
};
export const add_store = (product) => {
    return {
        type: ADD_STORE,
        product
    }
};
export const delete_store = (item) => {
    return {
        type: DELETE_STORE,
        item
    }
};
export const update_amount = (arrow) => {
    return {
        type: UPDATE_AMOUNT,
        arrow
    }
};
export const sub_amount = (arr) => {
    return {
        type: SUB_AMOUNT,
        arr
    }
};
export const add_post = (pro) => {
    return {
        type: ADD_POST,
        pro
    }

}
export const get_info = (id) => {
    return {
        type: GET_INFO,
        id
    }
}
export const edit_info = (obj) => {
    return {
        type: EDIT_INFO,
        obj
    }
}
export const delete_product = (dele) => {
    return {
        type: DELETE_PRODUCT,
        dele
    }
}

export const add_payment = (check) => {
    return {
        type: ADD_PAYMENT,
        check
    }
}

export const delete_payment = (pay) => {
    return {
        type: DELETE_PAYMENT,
        pay
    }
}

export const clear_payment = () => {
    return {
        type: CLEAR_PAYMENT    
    }
}