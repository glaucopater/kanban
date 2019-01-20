
import { read_cookie, bake_cookie }  from 'sfcookies';
import { BOARD_COOKIE } from '../common/constants';
import {
    ADD_CARD,
    REMOVE_CARD,
    MOVE_CARD,
    RECEIVE_DATA,
    UPDATE_BOARD,
    CREATE_CARD
} from '../actions/actionTypes';

const initialState = {
    board_store: []
};

const board_store = (state = initialState.board_store, action ) => {
    let board_store;
    switch (action.type) {
        case ADD_CARD: 
            board_store = Object.assign({}, state, action.board_store);
            break;
        case REMOVE_CARD: 
            board_store = Object.assign({}, state, action.board_store);
            break; 
        case MOVE_CARD: 
            board_store =  action.board_store;
            break; 
        case RECEIVE_DATA: 
            board_store =  action.board_store;
            break; 
        case UPDATE_BOARD:  
            board_store = Object.assign({}, state, action.board_store);
            break; 
        case CREATE_CARD:  
            board_store = Object.assign({}, state, action.board_store);
            break; 
        default: 
            board_store = read_cookie(BOARD_COOKIE) || state;
    }  
    bake_cookie(BOARD_COOKIE, board_store);
    return board_store;
}


export default board_store;