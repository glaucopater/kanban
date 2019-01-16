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
 
  }
 

  handleOnClick(){
    console.log("click");
  }

  handleAdd = () => {
    const randomIndex = getRandomInt(DATA.length);
    console.log("click add item ",0,DATA.length, randomIndex);
    const random_task = DATA.filter((task) => { return task.index === randomIndex && task.category === this.state.category } );

    const category_tasks = [...random_task, ...this.state.category_tasks];
    this.setState({category_tasks });
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
      <div className={"Column " + category }>
      <header>
        <h1>{category}</h1>
        <h2>({this.state.category_tasks.length})</h2>
        <button onClick={this.handleAdd}>+</button>
      </header>  
        <div className="task-container"> 
          {cards}
        </div>
      </div>
    );
  }
}
