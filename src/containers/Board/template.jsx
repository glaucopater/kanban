import React from "react";
import "./Board.scss";
import Column from "../Column/Column";
import { connect } from "react-redux";
import { fetchData } from "../../store/actions/actions";
import PropTypes from "prop-types";

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { boardStore: {} };
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const boardColumns =
      (this.props.boardStore && Object.keys(this.props.boardStore)) || [];
    const columns = boardColumns.map((category, key) => {
      return (
        <Column
          key={key}
          category={category}
          removeCardFromColumn={this.props.removeCardFromColumn}
          moveCard={this.props.moveCard}
          createCard={this.props.createCard}
          updateCard={this.props.updateCard}
          category_tasks={this.props.boardStore[category]}
        />
      );
    });

    return <div className="Board">{columns}</div>;
  }
}

export default connect(
  (state) => {
    let boardStore;
    if (state.boardStore.constructor === Array) {
      boardStore = {};
    } else boardStore = state.boardStore;
    return { boardStore };
  },
  { fetchData }
)(Board);

Board.propTypes = {
  boardStore: PropTypes.object.isRequired,
  removeCardFromColumn: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  createCard: PropTypes.func.isRequired,
};
