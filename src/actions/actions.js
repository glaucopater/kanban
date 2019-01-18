import * as constants from './actionTypes';

export const addCard = category => {
    console.log("action addcard to category", category);
    return {
        type: constants.ADD_CARD,
        category
    }
}

export const removeCard = card => {
    return {
        type: constants.REMOVE_CARD,
        card
    }
}

export const moveCard = card => {
    return {
        type: constants.REMOVE_CARD,
        card
    }
}