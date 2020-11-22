import React from "react";
import "./Board.scss";
import Column from "../Column/Column";
import { connect } from "react-redux";
import { fetchData } from "../../store/actions/actions";


export interface IAppState {
  boardStore: any;
}

interface IBoardProps {
  fetchData: () => void;
  removeCardFromColumn: (cardId: number, sourceCategory: string) => void;
  moveCard: (cardId: number, sourceCategory: string, destinationCategory: string) => void;
  updateCard: (card: any, destinationCategory: string) => void;
  createCard?: (card: any, destinationCategory: string) => void;
  boardStore: any;
}

interface IBoardState {
  boardStore: IAppState["boardStore"];
}

export class Board extends React.Component<IBoardProps, IBoardState> {
  constructor(props: IBoardProps) {
    super(props);
    this.state = { boardStore: {} };
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const boardColumns =
      (this.props.boardStore && Object.keys(this.props.boardStore)) || [];
    const columns = boardColumns.map((category: string, key: number) => {
      return (
        <Column
          key={key}
          category={category}
          removeCardFromColumn={this.props.removeCardFromColumn}
          moveCard={this.props.moveCard}
          createCard={this.props.createCard}
          updateCard={this.props.updateCard}
          category_tasks={this.props.boardStore[category]}
        />
      );
    });

    return <div className="Board">{columns}</div>;
  }
}

export default connect(
  (state: IAppState) => {
    let boardStore;
    if (state.boardStore.constructor === Array) {
      boardStore = {};
    } else boardStore = state.boardStore;
    return { boardStore };
  },
  { fetchData }
)(Board);
