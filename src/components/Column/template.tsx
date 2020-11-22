import React from "react";
import { Card } from "../Card/";
import "./styles.scss";

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

export const Column: React.FC<IColumnProps> = (props) => {
  const [state, setState] = React.useState<IColumnState>(props);
  React.useEffect(() => {
    setState({
      category: props.category,
      category_tasks: [],
    });
  }, [props.category]);

  const handleAdd = () => {
    const maxIdPerCategory = Math.max(
      ...props.category_tasks.map((item: any) => item.id),
      0
    );
    const nextId = maxIdPerCategory + 1;
    const new_task = { id: nextId, text: "Card " + nextId };
    const category_tasks = [new_task, ...props.category_tasks];
    setState({ ...state, category: state.category, category_tasks });
    props.createCard(new_task, props.category);
  };

  const handleRemove = (card_id_to_remove: number) => {
    const category_tasks = props.category_tasks.filter((task: any) => {
      return task.id !== card_id_to_remove;
    });
    setState({ ...state, category_tasks });
    props.removeCardFromColumn(card_id_to_remove, state.category);
  };

  const handleUpdate = (card: any) => {
    const new_task = card;
    const category_tasks = [new_task, ...props.category_tasks];
    setState({ ...state, category_tasks });
    props.updateCard(new_task, props.category);
  };

  const handleOnDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleOnDrop = (event: any) => {
    let id = event.dataTransfer.getData("id");
    let sourceCategory = event.dataTransfer.getData("sourceCategory");
    moveTask(id, sourceCategory);
  };

  const moveTask = (taskId: number, sourceCategory: string) => {
    if (sourceCategory !== state.category) {
      props.moveCard(taskId, sourceCategory, state.category);
    }
  };

  const category_tasks = props.category_tasks;
  const category = props.category ? props.category : "";
  const cards = category_tasks.map((task: any, key: number) => {
    return (
      <Card
        key={key}
        id={task.id}
        text={task.text}
        category={category}
        removeCard={handleRemove}
        updateCard={handleUpdate}
      />
    );
  });

  return (
    <div
      className={"Column " + category}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
    >
      <header>
        <h3>{category.split(/(?=[A-Z])/).join(" ")}</h3>
        <button className="add-button" onClick={handleAdd}>
          +
        </button>
        <div className="counter">({category_tasks.length})</div>
      </header>
      <div className="task-container droppable">{cards}</div>
    </div>
  );
};

