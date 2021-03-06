import * as _ from "lodash";
import { assign } from "lodash";
import { act } from "react-dom/test-utils";
import { GET_LIST_POST, GET_LIST_POST_SUCCESS, ADD_STORE, DELETE_STORE, UPDATE_AMOUNT, SUB_AMOUNT, ADD_POST, GET_INFO, EDIT_INFO, DELETE_PRODUCT, ADD_PAYMENT, DELETE_PAYMENT, CLEAR_PAYMENT, UPDATE_PAYMENT, ADD_BILL } from "../constant";
const INITIAL_STATE = {
    posts: [],
    load: false,
    stores: [],
    info: null,
    payments: [],
    bill:{}
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
                        amount: product?.amount || 1,
                        allAmount: product.allAmount - 1,

                    },
                    ...state.stores],
                posts: _.map(state.posts, o => o.id === product.id ? { ...o, allAmount: product.allAmount - 1 } : o)


            };

        case DELETE_STORE:
            const { item } = action
            console.log(action)
            return {
                ...state,
                posts: _.map(state.posts, o => o.id === item.id ? { ...o, allAmount: o.allAmount + item.amount } : o),
                stores: _.remove(state.stores, o => o.id !== item.id),
                payments: _.remove(state.payments, o => o.id !== item.id)
            };

        case UPDATE_AMOUNT:
            const { arrow } = action
            console.log(action)
            console.log(state.stores)
            return {
                ...state,
                stores: _.map(state.stores, o => o.id === arrow.id ? { ...o, amount: arrow.amount, allAmount: o.allAmount - 1 } : o),
                posts: _.map(state.posts, o => o.id === arrow.id ? { ...o, allAmount: o.allAmount - 1 } : o),
                payments: _.map(state.payments, o => o.id === arrow.id ? { ...o, amount: arrow.amount} : o)

            }

        case SUB_AMOUNT:
            const { arr } = action
            console.log(action)
            console.log(state.stores)
            return {
                ...state,
                stores: _.map(state.stores, o => o.id === arr.id ? { ...o, amount: arr.amount, allAmount: o.allAmount + 1 } : o),
                posts: _.map(state.posts, o => o.id === arr.id ? { ...o, allAmount: o.allAmount + 1 } : o),
                payments: _.map(state.payments, o => o.id === arr.id ? { ...o, amount: arr.amount} : o)

            }

        case ADD_POST:
            const { pro } = action
            console.log(action)
            return {
                ...state,
                posts: [
                    {
                        id: pro.id,
                        title: pro.title,
                        price: pro.price,
                        images: [
                            pro.image?.name || null
                        ],
                        allAmount: pro.amount,

                    },
                    ...state.posts],
            }

        case GET_INFO:
            const { id } = action
            console.log(action)
            return {
                ...state,
                info: _.find(state.posts, o => o.id === id)
            }

        case EDIT_INFO:
            const { obj } = action
            console.log(action)
            return {
                ...state,
                posts: _.map(state.posts, o => o.id === obj.id ? { ...o, images: [obj.image.name], title: obj.title, price: obj.price, allAmount: obj.amount } : o),
                info: null

            }

        case DELETE_PRODUCT:
            const { dele } = action
            console.log(action)
            return {
                ...state,
                posts: _.remove(state.posts, o => o.id !== dele)
            }

        case ADD_PAYMENT:
            const { check } = action
            console.log(action)
            return {
                ...state,
                payments: [
                    {
                        id: check.id,
                        title: check.title,
                        price: check.price,
                        image: check.image,
                        amount: check.amount,
                    },
                    ...state.payments
                ]
            }

        case DELETE_PAYMENT:
            const { pay } = action
            console.log(action)
            return {
                ...state,
                payments: _.remove(state.payments, o => o.id !== pay.id)
            }
        
        case CLEAR_PAYMENT:
            console.log(action)
            return {
                ...state,
                payments: []
            }
        
        case ADD_BILL:
            const {billInfor} =action
            console.log(action)
            return {
                ...state,
                bill: 
                    {
                        name: billInfor.name,
                        address: billInfor.address,
                        phone: billInfor.phone,
                        note: billInfor.note,              
                    },
                
            }
        default:
            return state;
    }

};
export default reducer;