import * as _ from "lodash";
import { GET_LIST_POST, GET_LIST_POST_SUCCESS, ADD_STORE, DELETE_STORE, UPDATE_AMOUNT } from "../constant";
const INITIAL_STATE = {
    posts: [],
    load: false,
    stores: [],
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LIST_POST:
            return {
                ...state,
                load: true,
            };

        case GET_LIST_POST_SUCCESS:
            const { data } = action.payload;
            return {
                ...state,
                posts: data,
                load: false,
            };
        case ADD_STORE:
            const { product } = action
            console.log(action)
            return {
                ...state,
                stores: [
                    {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.images[1],
                        amount:product?.amount || 1,
                    },
                    ...state.stores],
            };

        case DELETE_STORE:
            return {
                ...state,
                stores: _.remove(state.stores, o => o.id !== action.id)
            };

        case UPDATE_AMOUNT:
            const { arrow } = action
            console.log(arrow,action)
            console.log (state.stores)
            return {
                ...state,
                stores: _.map(state.stores, o => o.id === arrow.id ? { ...o, amount: arrow.amount } : o)
                 
            }

        default:
            return state;
    }

};
export default reducer;