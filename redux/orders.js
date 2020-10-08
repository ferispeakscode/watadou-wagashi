import * as ActionTypes from './ActionTypes';

export const orders = (state = { errMess: null, orders: []}, action) => {
    
    switch (action.type) {
        case ActionTypes.ADD_ORDER:
            //add id to comment
            //working in the reducer - must use "state"
            let newOrder = {...action.payload, id: state.orders.length}
            //state is immutable in react - create a copy of the comments array to make changes
            let newOrders = state.orders.slice();
            //add new comment to array of existing comments
            newOrders.push(newOrder);
            return {...state, orders: newOrders};

        case ActionTypes.DELETE_ORDER:
            return { orders: state.orders.filter(order => order.id !== action.payload)};

        default:
            return state;
    }
};