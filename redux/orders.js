import * as ActionTypes from './ActionTypes';

export const orders = (state = [], action) => {

    switch (action.type) {
        case ActionTypes.ADD_ORDER:
            if (state.includes(action.payload)) {
                return state;
            }
            return state.concat(action.payload);

        case ActionTypes.DELETE_ORDER:
            return state.filter(order => order !== action.payload);

        default:
            return state;
    }
}