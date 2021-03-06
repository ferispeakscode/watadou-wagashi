import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const postComment = (wagashiId, rating, author, text) => dispatch => {
    const newComment = {
        wagashiId,
        rating,
        author,
        text
    };

    //add new property called "Date" to newComment object
    newComment["date"] = new Date().toISOString();

    setTimeout(() => {
        dispatch(addComment(newComment));
    }, 2000);
};

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const fetchPromotions = () => dispatch => {
    
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});

export const fetchWagashi = () => dispatch => {

    dispatch(wagashiLoading());

    return fetch(baseUrl + 'wagashi')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(wagashi => dispatch(addWagashi(wagashi)))
        .catch(error => dispatch(wagashiFailed(error.message)));
};

export const wagashiLoading = () => ({
    type: ActionTypes.WAGASHI_LOADING
});

export const wagashiFailed = errMess => ({
    type: ActionTypes.WAGASHI_FAILED,
    payload: errMess
});

export const addWagashi = wagashi => ({
    type: ActionTypes.ADD_WAGASHI,
    payload: wagashi
});

export const fetchSuppliers = () => dispatch => {

    dispatch(suppliersLoading());

    return fetch(baseUrl + 'suppliers')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(suppliers => dispatch(addSuppliers(suppliers)))
        .catch(error => dispatch(suppliersFailed(error.message)));
};

export const suppliersLoading = () => ({
    type: ActionTypes.SUPPLIERS_LOADING
});

export const suppliersFailed = errMess => ({
    type: ActionTypes.SUPPLIERS_FAILED,
    payload: errMess
});

export const addSuppliers = suppliers => ({
    type: ActionTypes.ADD_SUPPLIERS,
    payload: suppliers
});

export const postFavorite = wagashiId => dispatch => {
    setTimeout(() => {
        dispatch(addFavorite(wagashiId));
    }, 2000);
};

export const addFavorite = wagashiId => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: wagashiId
});

export const deleteFavorite = wagashiId => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: wagashiId
});

export const postOrder = (name, type, number, date, gift) => dispatch => {
    const newOrder = {
        name,
        type,
        number,
        date,
        gift
    }
    setTimeout(() => {
        dispatch(addOrder(newOrder));
    }, 2000);
};

export const addOrder = order => ({
    type: ActionTypes.ADD_ORDER,
    payload: order
});

export const deleteOrder = orderId => ({
    type: ActionTypes.DELETE_ORDER,
    payload: orderId
})