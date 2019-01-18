import React from "react";
import "./Board.css";
import Column from "../Column/Column";  

export default class Board extends React.Component {

  render() {
    console.log(this.props);
    const columns = this.props.CATEGORIES.map((category, key) => {
      return <Column key={key} 
      category={category}
      addCard={this.props.addCard}
      removeCard={this.props.removeCard}
      moveCard={this.props.moveCard}
      />;
    });
    return <div className="Board">{columns}</div>;
  }
}