import React from "react";  
import Card from "../../components/Card/Card"; 
import "./Column.css";
//import { DATA } from "../../common/data"; 
import { getRandomInt } from "../../common/helpers"; 

export default class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.category,
      category_tasks: []
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleOnDragOver = this.handleOnDragOver.bind(this);
    this.handleOnDrop = this.handleOnDrop.bind(this);
  }

  handleOnClick(){
    console.log("click");
  }

  handleAdd = () => {
    const maxNum = this.props.data[this.state.category].length ? this.props.data[this.state.category].length + 100 : 100;  
    const randomIndex = getRandomInt(maxNum); 
    const new_task = { id: randomIndex + 100 , text : "text"+randomIndex }; 
    const category_tasks = [new_task, ...this.state.category_tasks];
    this.setState({category_tasks});
    this.props.addCard(this.state.category);
  }

  handleRemove = (id_to_remove) => {
    const category_tasks = this.state.category_tasks.filter((task) => { return  task.id !== id_to_remove } );
    this.setState({category_tasks});
    this.props.updateBoard(this.state.category_tasks);
  }


  handleOnDragOver(ev){ 
    ev.preventDefault();
  }

  handleOnDrop(ev){ 
    let id = ev.dataTransfer.getData("id");
    let sourceCategory = ev.dataTransfer.getData("sourceCategory");
    this.moveTask(id, sourceCategory);
  }

  moveTask(taskId,sourceCategory){ 
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
          handleRemove={this.handleRemove}/>
        });
    
    return (
      <div className={"Column " + category} 
      category={category} 
      onDrop={this.handleOnDrop} 
      onDragOver={this.handleOnDragOver} 
      droppable="true" >
      <header>
        <h3>{category}</h3>
        <button className="add-button" onClick={this.handleAdd}>+</button>
        <h4>({category_tasks.length})</h4>
      </header>  
        <div className="task-container droppable"> 
          {cards}
        </div>
      </div>
    );
  }
}
