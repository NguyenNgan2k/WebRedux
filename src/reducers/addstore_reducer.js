import * as _ from "lodash";
const initialState = []
export const addstore_reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_STORE":
            return [
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    price: action.payload.price,
                    amount: action.payload?.amount || 1,
                },
                ...state];

        case "DELETE_STORE":
            return _.remove(state, o => o.id !== action.id);

        case "UPDATE_AMOUNT":
            return _.map(state, o => o.id === action.arrow.id ? { ...o, amount: action.arrow.amount } : o);


        default:
            return state;
    }

};
export default addstore_reducer;