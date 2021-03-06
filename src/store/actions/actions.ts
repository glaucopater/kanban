import * as constants from "./actionTypes";
import { DATA } from "../../common/data";
import { read_cookie } from "sfcookies";
import { BOARD_COOKIE } from "../../common/constants";

export const moveCard = (cardId: number, sourceCategory: string, destinationCategory: string) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
    dispatch(addCard(boardStore, cardId, sourceCategory, destinationCategory));
    dispatch(removeCardFromColumn(cardId, sourceCategory));
  };
};

export const updateCard = (card: any, destinationCategory: string) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
    const updatedCard = card;
    dispatch(removeCard(boardStore, card.id, destinationCategory));
    dispatch(createNewCard(boardStore, updatedCard, destinationCategory));
  };
};

export const addCard = (
  boardStore: any,
  cardId: number,
  sourceCategory: string,
  destinationCategory: string
) => {
  const cardToMove = boardStore[sourceCategory].filter((card: any) => {
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

export const createCard = (newCard: any, destinationCategory: string) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
    dispatch(createNewCard(boardStore, newCard, destinationCategory));
  };
};

export const createNewCard = (boardStore: any, newCard: any, destinationCategory: string) => {
  boardStore[destinationCategory] = [
    newCard,
    ...boardStore[destinationCategory],
  ];
  return {
    type: constants.CREATE_CARD,
    boardStore: boardStore,
  };
};

export const removeCard = (boardStore: any, cardId: number, sourceCategory: string) => {
  if (boardStore) {
    boardStore[sourceCategory] = boardStore[sourceCategory].filter((card: any) => {
      return card.id !== +cardId;
    });
  }
  return {
    type: constants.REMOVE_CARD,
    boardStore: boardStore,
  };
};

export const removeCardFromColumn = (cardId: number, sourceCategory: string) => {
  return (dispatch: any, getState: any) => {
    const boardStore = getState().boardStore;
    dispatch(removeCard(boardStore, cardId, sourceCategory));
  };
};

export const fetchData = () => {
  return (dispatch: any) => {
    const boardStore = read_cookie(BOARD_COOKIE);
    let data;
    if (boardStore && boardStore.constructor === Array) {
      data = DATA;
    } else data = boardStore;

    dispatch({ type: constants.RECEIVE_DATA, boardStore: data });
  };
};

export const receiveData = (data: any, state: any) => {
  return {
    type: constants.RECEIVE_DATA,
    state,
  };
};

export const updateBoard = (data: any, state: any) => {
  return {
    type: constants.UPDATE_BOARD,
    state,
  };
};
