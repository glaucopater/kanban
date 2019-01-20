import React from "react";
import "./Board.css";
import Column from "../Column/Column";  
import { connect } from 'react-redux';
import { fetchData , updateBoard } from '../../actions/actions';  

export class Board extends React.Component {
  constructor(props){
    super(props);
    this.state= { board_store: [] };
  }

  componentDidMount(){
    this.props.fetchData();
  }
  
  updateBoard = (tasks) => {
    this.setState({board_store: tasks }); 
    this.props.updateBoard(this.state.board_store);
  }

  render() {
    const columns = Object.keys(this.props.board_store).map((category, key) => {
      return <Column key={key} 
      category={category}
      addCard={this.props.addCard}
      removeCard={this.props.removeCard}
      moveCard={this.props.moveCard}
      updateBoard={this.updateBoard}
      category_tasks={this.props.board_store[category]}/>;
    });

    return <div className="Board">{columns}</div>;
  }
}


export default connect(state => { return { board_store: state.board_store }}, { fetchData, updateBoard })(Board);