import { connect } from 'react-redux';
import { addCard, removeCard, moveCard } from '../actions/actions'; 
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
        removeCard: (card) => {
            dispatch(removeCard(card));
        },
        moveCard: (card,sourceCategory,destinationCategory) => {
            dispatch(moveCard(card,sourceCategory,destinationCategory));
        }
    };
};

export const BoardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);