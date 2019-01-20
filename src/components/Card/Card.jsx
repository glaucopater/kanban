import React from "react";
import "./Card.css";

const Card = props => {

  const handleOnClick = () => {
    props.handleRemove(props.id);
  }

  const handleOnDragStart = (ev,id) => { 
    ev.dataTransfer.setData("id", id);
    ev.dataTransfer.setData("sourceCategory", props.category);
    console.log("handleOnDragStart", id);
  }

  return (
    <div className={"Card " + props.category} 
    onDragStart={e => handleOnDragStart(e, props.id)}  
    draggable  
     >
    <header className="card-header">
      <button className="button-remove" onClick={handleOnClick}>x</button>
    </header>
    <div className="card-body">
      {props.text}
    </div>
  </div>)
  
};

export default Card;
