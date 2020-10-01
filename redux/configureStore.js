import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { comments } from './comments';
import { promotions } from './promotions';
import { favorites } from './favorites';
import { wagashi } from './wagashi';
import { suppliers } from './suppliers';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            comments,
            promotions,
            favorites,
            wagashi,
            suppliers
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}