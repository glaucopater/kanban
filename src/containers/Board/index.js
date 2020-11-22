import { connect } from "react-redux";
import {
  addCard,
  removeCard,
  moveCard,
  removeCardFromColumn,
  createCard,
  updateCard,
} from "../../store/actions/actions";
import Board from "./template";

const mapStateToProps = (state) => {
  return {
    boardStore: state.boardStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (destinationCategory) => {
      dispatch(addCard(destinationCategory));
    },
    removeCard: (cardId) => {
      dispatch(removeCard(cardId));
    },
    moveCard: (cardId, sourceCategory, destinationCategory) => {
      dispatch(moveCard(cardId, sourceCategory, destinationCategory));
    },
    removeCardFromColumn: (cardId, sourceCategory) => {
      dispatch(removeCardFromColumn(cardId, sourceCategory));
    },
    createCard: (card, destinationCategory) => {
      dispatch(createCard(card, destinationCategory));
    },
    updateCard: (card, destinationCategory) => {
      dispatch(updateCard(card, destinationCategory));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
