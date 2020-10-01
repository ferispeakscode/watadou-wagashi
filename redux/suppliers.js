import * as ActionTypes from './ActionTypes';

export const suppliers = (state = { isLoading: true,
                                    errMess: null,
                                    suppliers: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SUPPLIERS:
            return {...state, isLoading: false, errMess: null, suppliers: action.payload};

        case ActionTypes.SUPPLIERS_LOADING:
            return {...state, isLoading: true, errMess: null, suppliers: []};

        case ActionTypes.SUPPLIERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};








import * as ActionTypes from './ActionTypes';

export const partners = (state = { isLoading: true,
                                    errMess: null,
                                    partners: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PARTNERS:
            return {...state, isLoading: false, errMess: null, partners: action.payload};

        case ActionTypes.PARTNERS_LOADING:
            return {...state, isLoading: true, errMess: null, partners: []}

        case ActionTypes.PARTNERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};