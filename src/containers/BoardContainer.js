import { connect } from 'react-redux';
import { addCard, removeCard, moveCard, removeCardFromColumn, createCard, updateCard } from '../actions/actions'; 
import Board from './Board/Board';

const mapStateToProps = state => {
    return { 
        board_store: state.board_store 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addCard: (destinationCategory) => {
            dispatch(addCard(destinationCategory));
        },
        removeCard: (cardId) => {
            dispatch(removeCard(cardId));
        },
        moveCard: (cardId,sourceCategory,destinationCategory) => {
            dispatch(moveCard(cardId,sourceCategory,destinationCategory));
        },
        removeCardFromColumn: (cardId,sourceCategory,destinationCategory) => {
            dispatch(removeCardFromColumn(cardId,sourceCategory,destinationCategory));
        },
        createCard: (card,destinationCategory) => {
            dispatch(createCard(card,destinationCategory));
        },
        updateCard: (card,destinationCategory) => {
            dispatch(updateCard(card,destinationCategory));
        }
    };
};

export const BoardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);