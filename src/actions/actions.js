import * as constants from './actionTypes';
import { DATA }  from "../common/data";
import { read_cookie }  from 'sfcookies';
import { BOARD_COOKIE } from '../common/constants';

export const moveCard = (cardId, sourceCategory, destinationCategory) => {
        return (dispatch, getState) => {
            const board_store = getState().board_store;
            dispatch(addCard(board_store, cardId, sourceCategory, destinationCategory));
            dispatch(removeCard(board_store, cardId, sourceCategory));  
        };
    };

export const updateCard = (card, destinationCategory) => {
    return (dispatch, getState) => {
        const board_store = getState().board_store; 
        const updatedCard = card;
        dispatch(removeCard(board_store, card.id, destinationCategory));  
        dispatch(createNewCard(board_store, updatedCard, destinationCategory)); 
    };
}

export const addCard = (board_store, cardId, sourceCategory, destinationCategory) => { 
    const cardToMove = board_store[sourceCategory].filter((card) => { return card.id === +cardId });
    board_store[destinationCategory] = [...cardToMove, ...board_store[destinationCategory] ]; 
    return {
        type: constants.ADD_CARD,
        board_store
    }
}

export const createCard = (newCard, destinationCategory) => {
    return (dispatch, getState) => {
        const board_store = getState().board_store;
        dispatch(createNewCard(board_store, newCard, destinationCategory));  
    };
};

export const createNewCard = (board_store, newCard, destinationCategory) => { 
    board_store[destinationCategory] = [newCard, ...board_store[destinationCategory] ]; 
    return {
        type: constants.CREATE_CARD,
        board_store
    }
}

export const removeCard = (board_store, cardId, sourceCategory) => {  
    if (board_store) {
        board_store[sourceCategory] = board_store[sourceCategory].filter((card) => { return card.id !== +cardId });
    } 
    return {
        type: constants.REMOVE_CARD,
        board_store
    }
}

export const removeCardFromColumn = (cardId, sourceCategory) => {
    return (dispatch, getState) => {
        const board_store = getState().board_store;
        dispatch(removeCard(board_store, cardId, sourceCategory));  
    };
};

export const fetchData = () => { 
    return dispatch => {
        dispatch({ type: constants.RECEIVE_DATA, board_store: read_cookie(BOARD_COOKIE) ? read_cookie(BOARD_COOKIE) : DATA })
    };
};

export const receiveData =  (data, state)  => {
    return {
        type: constants.RECEIVE_DATA,
        state
    }
}

export const updateBoard = (data, state)  => {
    return {
        type: constants.UPDATE_BOARD,
        state
    }
}