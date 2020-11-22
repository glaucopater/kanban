import * as constants from "./actionTypes";
import { DATA } from "../../common/data";
import { read_cookie } from "sfcookies";
import { BOARD_COOKIE } from "../../common/constants";

export const moveCard = (cardId, sourceCategory, destinationCategory) => {
  return (dispatch, getState) => {
    const boardStore = getState().boardStore;
    dispatch(addCard(boardStore, cardId, sourceCategory, destinationCategory));
    dispatch(removeCard(boardStore, cardId, sourceCategory));
  };
};

export const updateCard = (card, destinationCategory) => {
  return (dispatch, getState) => {
    const boardStore = getState().boardStore;
    const updatedCard = card;
    dispatch(removeCard(boardStore, card.id, destinationCategory));
    dispatch(createNewCard(boardStore, updatedCard, destinationCategory));
  };
};

export const addCard = (
  boardStore,
  cardId,
  sourceCategory,
  destinationCategory
) => {
  const cardToMove = boardStore[sourceCategory].filter((card) => {
    return card.id === +cardId;
  });
  boardStore[destinationCategory] = [
    ...cardToMove,
    ...boardStore[destinationCategory],
  ];
  return {
    type: constants.ADD_CARD,
    boardStore: boardStore,
  };
};

export const createCard = (newCard, destinationCategory) => {
  return (dispatch, getState) => {
    const boardStore = getState().boardStore;
    dispatch(createNewCard(boardStore, newCard, destinationCategory));
  };
};

export const createNewCard = (boardStore, newCard, destinationCategory) => {
  boardStore[destinationCategory] = [
    newCard,
    ...boardStore[destinationCategory],
  ];
  return {
    type: constants.CREATE_CARD,
    boardStore: boardStore,
  };
};

export const removeCard = (boardStore, cardId, sourceCategory) => {
  if (boardStore) {
    boardStore[sourceCategory] = boardStore[sourceCategory].filter((card) => {
      return card.id !== +cardId;
    });
  }
  return {
    type: constants.REMOVE_CARD,
    boardStore: boardStore,
  };
};

export const removeCardFromColumn = (cardId, sourceCategory) => {
  return (dispatch, getState) => {
    const boardStore = getState().boardStore;
    dispatch(removeCard(boardStore, cardId, sourceCategory));
  };
};

export const fetchData = () => {
  return (dispatch) => {
    const boardStore = read_cookie(BOARD_COOKIE);
    let data;
    if (boardStore && boardStore.constructor === Array) {
      data = DATA;
    } else data = boardStore;

    dispatch({ type: constants.RECEIVE_DATA, boardStore: data });
  };
};

export const receiveData = (data, state) => {
  return {
    type: constants.RECEIVE_DATA,
    state,
  };
};

export const updateBoard = (data, state) => {
  return {
    type: constants.UPDATE_BOARD,
    state,
  };
};
