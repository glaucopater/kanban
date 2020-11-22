import React from "react";
import "./styles.scss";

interface ICardProps {
  category: string;
  category_tasks?: any;
  createCard?: any;
  removeCard?: any;
  updateCard?: any;
  editable?: boolean;
  text?: string;
  value?: string;
  id: number;
}

interface ICardState {
  id?: number;
  text?: string;
  value?: string;
  editable?: boolean;
}

export const Card : React.FC<ICardProps> = (props) => {
  const [state, setState] = React.useState<ICardState>(props);
  React.useEffect(() => {
    setState({ editable: false, value: "", text: "", id: 0 });
  }, [props.category]);

  const handleOnEdit = () => {
    setState({ editable: true });
  };

  const handleOnRemove = () => {
    props.removeCard(props.id);
  };

  const handleOnBlur = (event: { target: { value: string; }; }) => {
    const cleanedValue = event.target.value.trim();
    if (cleanedValue !== "") {
      setState({ editable: false, value: event.target.value });
      props.updateCard({ id: props.id, text: state.text });
    }
  };

  const handleChange = (event: any) => {
    setState({ value: event.target.value });
  };

  const handleOnDragStart = (ev: any, id: number) => {
    ev.dataTransfer.setData("id", id);
    ev.dataTransfer.setData("sourceCategory", props.category);
  };

  const getInputField = () =>{
    return (
      <textarea
        value={state.value}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />
    );
  }

  const content = state.editable
    ? getInputField()
    : props.text;

  return (
    <div
      className={"Card " + props.category}
      onDragStart={(e) => handleOnDragStart(e, props.id)}
      draggable
    >
      <button className="button-remove" onClick={handleOnRemove}>
        x
      </button>
      <div className="card-body" onClick={handleOnEdit}>
        {content}
      </div>
    </div>
  );

}