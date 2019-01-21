import React from "react";  
import Card from "../../components/Card/Card"; 
import "./Column.scss";
import { getRandomInt } from "../../common/helpers"; 
import PropTypes from 'prop-types';

export default class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.category,
      category_tasks: []
    }; 
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleOnDragOver = this.handleOnDragOver.bind(this);
    this.handleOnDrop = this.handleOnDrop.bind(this);
  }

  handleAdd = () => {
    const maxNum = this.props.category_tasks.length ? this.props.category_tasks.length + 100 : 100;  
    const randomIndex = getRandomInt(maxNum); 
    const new_task = { id: randomIndex + 100 , text : "text"+randomIndex }; 
    const category_tasks = [new_task, ...this.props.category_tasks];
    this.setState({category_tasks});
    this.props.createCard(new_task, this.props.category);
  }

  handleRemove = (card_id_to_remove) => { 
    const category_tasks = this.props.category_tasks.filter((task) => { return  task.id !== card_id_to_remove } );
    this.setState({category_tasks});
    this.props.removeCardFromColumn(card_id_to_remove, this.state.category);
  }

  handleUpdate = (card) => {
    const new_task = card;
    const category_tasks = [new_task, ...this.props.category_tasks];
    this.setState({category_tasks});
    this.props.updateCard(new_task, this.props.category);
  }

  handleOnDragOver(ev){ 
    ev.preventDefault();
  }

  handleOnDrop(ev){ 
    let id = ev.dataTransfer.getData("id");
    let sourceCategory = ev.dataTransfer.getData("sourceCategory");
    this.moveTask(id, sourceCategory);
  }

  moveTask(taskId, sourceCategory){ 
    this.props.moveCard(taskId, sourceCategory, this.state.category);
  }

  render() { 
    const category_tasks = this.props.category_tasks;
    const category = this.props.category ? this.props.category : ""; 
    const cards = category_tasks.map((task, key) => { 
          return <Card key={key} 
          id={task.id} 
          text={task.text}
          bgcolor={task.bgcolor} 
          category={category} 
          removeCard={this.handleRemove}
          updateCard={this.handleUpdate}/>
        });
    
    return (
      <div className={"Column " + category} 
      category={category} 
      onDrop={this.handleOnDrop} 
      onDragOver={this.handleOnDragOver} 
      droppable="true" >
      <header>
        <h3>{category.split(/(?=[A-Z])/).join(" ")}</h3>
        <button className="add-button" onClick={this.handleAdd}>+</button>
        <div className="counter">({category_tasks.length})</div>
      </header>  
        <div className="task-container droppable"> 
          {cards}
        </div>
      </div>
    );
  }
}

Column.propTypes = { 
  category_tasks: PropTypes.array.isRequired
}