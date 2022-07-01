const initialState = []
export const addstore_reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_STORE":
            return [
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    price: action.payload.price
                },
                ...state];

        case "DELETE_STORE":
            return state.filter((item) => item.id !== action.payload.id);

        default:
            return state;
    }

};
export default addstore_reducer;