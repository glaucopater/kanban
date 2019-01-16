import React from "react";
import "./Card.css";

const Card = props => {

  const handleOnClick = () => {
    props.handleRemove(props.index);
  }

  return (
  <div className="Card">
    <button onClick={handleOnClick}>x</button>
    {props.text}
  </div>)
  
};

export default Card;
