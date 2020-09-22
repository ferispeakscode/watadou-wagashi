import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.ADD_COMMENT:
            //add id to comment
            //working in the reducer - must use "state"
            let newComment = {...action.payload, id: state.comments.length}
            //state is immutable in react - create a copy of the comments array to make changes
            let newComments = state.comments.slice();
            //add new comment to array of existing comments
            newComments.push(newComment);
            return {...state, comments: newComments};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};

        default:
            return state;
    }
};