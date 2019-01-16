import React from "react";
import ReactDOM from "react-dom"; 
import Board from "./containers/Board/Board"; 

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Kanban</h1> 
      <Board />  
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
