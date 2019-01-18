import React from "react";  
import Card from "../../components/Card/Card"; 
import "./Column.css";
import { DATA } from "../../common/constants";
import  "../../common/helpers";
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

  //add new
  handleAdd = () => {
    const randomIndex = getRandomInt(DATA.length);
    console.log("click add item ",0,DATA.length, randomIndex);
    const random_task = DATA.filter((task) => { return task.index === randomIndex && task.category === this.state.category } );

    const category_tasks = [...random_task, ...this.state.category_tasks];
    this.setState({category_tasks});
  }

  handleRemove = (index_to_remove) => {
    console.log("click remove item ", index_to_remove);
    const category_tasks = this.state.category_tasks.filter((task) => { return  task.index !== index_to_remove } );
    this.setState({category_tasks});
  }

  componentDidMount() {
    const category_tasks = DATA.filter((task, key) => { return task.category === this.state.category })
    this.setState({category_tasks});
  }

  handleOnDragOver(ev){ 
    ev.preventDefault();
  //  console.log("handleOnDragOver",e.target);
  }

  handleOnDrop(ev){ 
    let id = ev.dataTransfer.getData("id");
    console.log("handleOnDrop", id, " to ", this.props.category);
    this.moveTask(id, this.props.category);
  }

  


  moveTask(taskId,destinationCategory){
    console.log("moveTask",destinationCategory);
    /*
    const current_tasks = this.state.category_tasks.map((task, key) => { 
      console.log("updating", task.index , taskId);
      if(task.index === taskId) {
        return { 
          index: task.index,
          order: task.order,
          category: destinationCategory, 
          text: task.text,
          color: task.color
        };
      }
      else 
        return task;
    });*/
    const current_tasks = this.state.category_tasks;
    current_tasks.push({ 
      index: 100,
      order: 1,
      category: destinationCategory, 
      text: "new ",
      color: "red"
    });
    this.setState({tasks: current_tasks});
  }

  render() {
    const cards = this.state.category_tasks.map((task, key) => { 
          return <Card key={key} 
          index={task.index} 
          text={task.text}
          bgcolor={task.bgcolor} 
          category={this.state.category} 
          handleRemove={this.handleRemove}/>
        });
    
    const category = this.props.category ? this.props.category : "";
    console.log(category);
    return (
      <div className={"Column " + category }  category={category} onDrop={this.handleOnDrop} onDragOver={this.handleOnDragOver} droppable="true" >
      <header>
        <h3>{category}</h3>
        <button className="add-button" onClick={this.handleAdd}>+</button>
        <h4>({this.state.category_tasks.length})</h4>
      </header>  
        <div className="task-container droppable"  > 
          {cards}
        </div>
      </div>
    );
  }
}
