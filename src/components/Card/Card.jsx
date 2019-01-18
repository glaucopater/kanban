import React from "react";
import "./Card.css";

const Card = props => {

  const handleOnClick = () => {
    props.handleRemove(props.index);
  }

  const handleOnDragStart = (ev,id) => { 
    ev.dataTransfer.setData("id", id);
    console.log("handleOnDragStart", id);
  }

  const handleOnDragEnd = (ev,id) => { 
      console.log("handleOnDragEnd");
     // ev.dataTransfer.setData("id", id);
    }

  return (
    <div className={"Card " + props.category} 
    onDragStart={e => handleOnDragStart(e, props.index)}  
    draggable 
    onDragEnd={handleOnDragEnd}  
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
