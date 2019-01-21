import React from "react";
import "./Card.scss";
import PropTypes from 'prop-types';

export class Card extends React.Component{

  constructor(props){
    super(props);
    this.state = { editable: false, value: '' };
    this.handleOnEdit = this.handleOnEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnRemove = this.handleOnRemove.bind(this);
  }

  handleOnEdit = () => {
    this.setState({ editable: true });
  }

  handleOnRemove = () => {
    this.props.removeCard(this.props.id);
  }

  handleOnBlur = (event) => {
    const cleanedValue = event.target.value.trim();
    if(cleanedValue !== "" ){
      this.setState({ editable: false, value: event.target.value})
      this.props.updateCard({ id: this.props.id, text: this.state.value });
    }
  }

  handleChange = (event) => { 
    this.setState({ value: event.target.value});
  }

  handleOnDragStart = (ev,id) => { 
    ev.dataTransfer.setData("id", id);
    ev.dataTransfer.setData("sourceCategory", this.props.category);
  }

  getInputField() {
    return <textarea value={this.state.value} onChange={this.handleChange} onBlur={this.handleOnBlur}/>;
  }

  render(){
    const content = this.state.editable ? this.getInputField(this.state.text) : this.props.text;
    return (
    <div className={"Card " + this.props.category} 
      onDragStart={e => this.handleOnDragStart(e, this.props.id)}  
      draggable> 
      <button className="button-remove" onClick={this.handleOnRemove}>x</button> 
    <div className="card-body" onClick={this.handleOnEdit}>
      {content}
    </div>
  </div>)
  }
};

export default Card;

Card.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string
}