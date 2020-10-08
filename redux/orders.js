// import * as ActionTypes from './ActionTypes';

// export const orders = (state = [], action) => {

//     switch (action.type) {
//         case ActionTypes.ADD_ORDER:
//             if (state.includes(action.payload)) {
//                 return state;
//             }
//             return state.concat(action.payload);

//         case ActionTypes.DELETE_ORDER:
//             return state.filter(order => order !== action.payload);

//         default:
//             return state;
//     }
// }

import * as ActionTypes from './ActionTypes';

export const orders = (state = { errMess: null, orders: []}, action) => {
    switch (action.type) {

        case ActionTypes.ADD_ORDER:
            //add id to comment
            //working in the reducer - must use "state"
            let newOrder = {...action.payload, id: state.orders.length}
            //state is immutable in react - create a copy of the comments array to make changes
            let newOrder = state.orders.slice();
            //add new comment to array of existing comments
            newOrders.push(newOrder);
            return {...state, orders: newOrders};

        case ActionTypes.DELETE_ORDER:
            return state.filter(order => order !== action.payload);

        default:
            return state;
    }
};