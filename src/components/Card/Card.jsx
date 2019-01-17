import React from "react";
import "./Card.css";

const Card = props => {

  const handleOnClick = () => {
    props.handleRemove(props.index);
  }

  return (
  <div className={"Card " + props.category }>
    <header className="card-header">
      <button className="button-remove" onClick={handleOnClick}>x</button>
    </header>
    <div className="card-body">
      {props.text}
    </div>
  </div>)
  
};

export default Card;
