import React from "react";
import Card from "../../components/Card/Card";
import "./Column.scss";


interface IColumnProps {
  category: string;
  category_tasks: any;
  createCard: any;
  updateCard: (card: any, destinationCategory: string) => void;
  moveCard: (cardId: number, sourceCategory: string, destinationCategory: string) => void;
  removeCardFromColumn: (id: number, category: string) => void;
}

interface IColumnState {
  category: string;
  category_tasks: string[];
}

export default class Column extends React.Component<IColumnProps, IColumnState> {
  constructor(props: IColumnProps) {
    super(props);
    this.state = {
      category: this.props.category,
      category_tasks: [],
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleOnDragOver = this.handleOnDragOver.bind(this);
    this.handleOnDrop = this.handleOnDrop.bind(this);
  }

  handleAdd = () => {
    const maxIdPerCategory = Math.max(
      ...this.props.category_tasks.map((item: any) => item.id),
      0
    );
    const nextId = maxIdPerCategory + 1;
    const new_task = { id: nextId, text: "Card " + nextId };
    const category_tasks = [new_task, ...this.props.category_tasks];
    this.setState({ category_tasks });
    this.props.createCard(new_task, this.props.category);
  };

  handleRemove = (card_id_to_remove: number) => {
    const category_tasks = this.props.category_tasks.filter((task: any) => {
      return task.id !== card_id_to_remove;
    });
    this.setState({ category_tasks });
    this.props.removeCardFromColumn(card_id_to_remove, this.state.category);
  };

  handleUpdate = (card: any) => {
    const new_task = card;
    const category_tasks = [new_task, ...this.props.category_tasks];
    this.setState({ category_tasks });
    this.props.updateCard(new_task, this.props.category);
  };

  handleOnDragOver(event: any) {
    event.preventDefault();
  }

  handleOnDrop(event: any) {
    let id = event.dataTransfer.getData("id");
    let sourceCategory = event.dataTransfer.getData("sourceCategory");
    this.moveTask(id, sourceCategory);
  }

  moveTask(taskId: number, sourceCategory: string) {
    if (sourceCategory !== this.state.category) {
      this.props.moveCard(taskId, sourceCategory, this.state.category);
    }
  }

  render() {
    const category_tasks = this.props.category_tasks;
    const category = this.props.category ? this.props.category : "";
    const cards = category_tasks.map((task: any, key: number) => {
      return (
        <Card
          key={key}
          id={task.id}
          text={task.text}
          category={category}
          removeCard={this.handleRemove}
          updateCard={this.handleUpdate}
        />
      );
    });

    return (
      <div
        className={"Column " + category}
        onDrop={this.handleOnDrop}
        onDragOver={this.handleOnDragOver}
      >
        <header>
          <h3>{category.split(/(?=[A-Z])/).join(" ")}</h3>
          <button className="add-button" onClick={this.handleAdd}>
            +
          </button>
          <div className="counter">({category_tasks.length})</div>
        </header>
        <div className="task-container droppable">{cards}</div>
      </div>
    );
  }
}
