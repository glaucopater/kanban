import React from "react";
import "./Board.scss";
import Column from "../Column/Column";  
import { connect } from 'react-redux';
import { fetchData , updateBoard } from '../../actions/actions';  
import PropTypes from 'prop-types';

export class Board extends React.Component {
  constructor(props){
    super(props);
    this.state= { board_store: [] };
  }

  componentDidMount(){
    this.props.fetchData();
  }

  render() {
    const columns = Object.keys(this.props.board_store).map((category, key) => {
      return <Column key={key} 
      category={category}
      removeCardFromColumn={this.props.removeCardFromColumn}
      moveCard={this.props.moveCard}
      createCard={this.props.createCard}
      category_tasks={this.props.board_store[category]}/>;
    });

    return <div className="Board">{columns}</div>;
  }
}

export default connect(state => { return { board_store: state.board_store }}, { fetchData, updateBoard })(Board);

Board.propTypes = { 
  category: PropTypes.string.isRequired,
  category_tasks: PropTypes.array.isRequired,
  removeCardFromColumn: PropTypes.func.isRequired, 
  moveCard: PropTypes.func.isRequired,
  createCard: PropTypes.func.isRequired
}