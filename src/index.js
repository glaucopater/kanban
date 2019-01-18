import React from "react";
import ReactDOM from "react-dom";  
import { BoardContainer } from "./containers/BoardContainer";  
import "./styles.css";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { Provider } from 'react-redux'; 
import logger from 'redux-logger'

 
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
)


function App() {
  return (
    <div className="App">
      <h1>Kanban</h1> 
      <BoardContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Provider store={store}>
  <App />
  </Provider>, rootElement);