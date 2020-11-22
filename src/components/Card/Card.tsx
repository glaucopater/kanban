import React from "react";
import "./Card.scss";

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

export class Card extends React.Component<ICardProps, ICardState> {
  constructor(props: ICardProps) {
    super(props);
    this.state = { editable: false, value: "", text: "", id: 0 };
    this.handleOnEdit = this.handleOnEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnRemove = this.handleOnRemove.bind(this);
  }

  handleOnEdit = () => {
    this.setState({ editable: true });
  };

  handleOnRemove = () => {
    this.props.removeCard(this.props.id);
  };

  handleOnBlur = (event: { target: { value: string; }; }) => {
    const cleanedValue = event.target.value.trim();
    if (cleanedValue !== "") {
      this.setState({ editable: false, value: event.target.value });
      this.props.updateCard({ id: this.props.id, text: this.state.text });
    }
  };

  handleChange = (event: any) => {
    this.setState({ value: event.target.value });
  };

  handleOnDragStart = (ev: any, id: number) => {
    ev.dataTransfer.setData("id", id);
    ev.dataTransfer.setData("sourceCategory", this.props.category);
  };

  getInputField() {
    return (
      <textarea
        value={this.state.value}
        onChange={this.handleChange}
        onBlur={this.handleOnBlur}
      />
    );
  }

  render() {
    const content = this.state.editable
      ? this.getInputField()
      : this.props.text;
    return (
      <div
        className={"Card " + this.props.category}
        onDragStart={(e) => this.handleOnDragStart(e, this.props.id)}
        draggable
      >
        <button className="button-remove" onClick={this.handleOnRemove}>
          x
        </button>
        <div className="card-body" onClick={this.handleOnEdit}>
          {content}
        </div>
      </div>
    );
  }
}

export default Card;
