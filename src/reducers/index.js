import { combineReducers } from 'redux';
import { CATEGORIES, DATA }  from "../common/data";

import {
    ADD_CARD,
    REMOVE_CARD,
    MOVE_CARD
} from '../actions/actionTypes';

const initialState = {
    DATA,
    CATEGORIES
};

const board_store = (state = initialState.DATA, action ) => {
    let board_store;
    switch (action.type) {
        case ADD_CARD: 
            board_store = state; 
            break;
        case REMOVE_CARD:
            board_store = state;
            break; 
        case MOVE_CARD: 
            board_store = state;
            break; 
        default: 
            board_store = state;
    }  
    return board_store;
}

const categories_store = (state = initialState.CATEGORIES) => {
    return state;
}

const reducers = combineReducers({
    board_store,
    categories_store
});

export default reducers;