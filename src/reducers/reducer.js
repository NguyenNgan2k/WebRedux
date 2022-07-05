import * as _ from "lodash";
import { assign } from "lodash";
import { act } from "react-dom/test-utils";
import { GET_LIST_POST, GET_LIST_POST_SUCCESS, ADD_STORE, DELETE_STORE, UPDATE_AMOUNT, SUB_AMOUNT } from "../constant";
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
                        allAmount: product.allAmount - 1,
                    
                    },
                    ...state.stores],
                     posts: _.map(state.posts, o => o.id === product.id ? { ...o, allAmount: product.allAmount - 1} : o)
                   
                    
            };

        case DELETE_STORE:
            const {item} = action
            console.log(action)
            return {
                ...state,
                posts: _.map(state.posts, o => o.id === item.id ? { ...o, allAmount: o.allAmount + item.amount} : o),
                stores: _.remove(state.stores, o => o.id !== item.id) 
            };

        case UPDATE_AMOUNT:
            const { arrow } = action
            console.log(action)
            console.log (state.stores)
            return {
                ...state,
                stores: _.map(state.stores, o => o.id === arrow.id ? { ...o, amount: arrow.amount, allAmount: o.allAmount - 1} : o),
                posts: _.map(state.posts, o => o.id === arrow.id ? { ...o, allAmount: o.allAmount - 1} : o)
                 
            }
        
            case SUB_AMOUNT:
                const { arr } = action
                console.log(action)
                console.log (state.stores)
                return {
                    ...state,
                    stores: _.map(state.stores, o => o.id === arr.id ? { ...o, amount: arr.amount, allAmount: o.allAmount + 1} : o),
                    posts: _.map(state.posts, o => o.id === arr.id ? { ...o, allAmount: o.allAmount + 1} : o)
                     
                }

        default:
            return state;
    }

};
export default reducer;