import React from "react";
import "./Board.css";
import Column from "../Column/Column"; 
import { CATEGORIES } from "../../common/constants";

export default class Board extends React.Component {
  render() {
    const columns = CATEGORIES.map((category, key) => {
      return <Column key={key} category={category} />;
    });
    return <div className="Board">{columns}</div>;
  }
}
