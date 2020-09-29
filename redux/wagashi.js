import * as ActionTypes from './ActionTypes';

export const wagashi = (state = { isLoading: true,
                                    errMess: null,
                                    wagashi: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_WAGASHI:
            return {...state, isLoading: false, errMess: null, wagashi: action.payload};

        case ActionTypes.WAGASHI_LOADING:
            return {...state, isLoading: true, errMess: null, wagashi: []}

        case ActionTypes.WAGASHI_FAILED:
            return {...state, isLoading: false, errMess: action.payLoad};

        default:
            return state;
    }
};