import React from "react";
import "./Todolists.css";

import TodoList from '../TodoList'
import AddTodo from '../AddTodo'

class TodoLists extends React.Component {
  constructor() {
    super();
    this.state = {
      toggle: 0,
      items: []
     }
    };

  doThis = () => {
    if (this.state.toggle === 0) {
      document.getElementById(`paragraph-${this.props.index}`).style.display = "block";
      this.setState({toggle: 1})
    } else {
      document.getElementById(`paragraph-${this.props.index}`).style.display = "none";
      this.setState({toggle: 0})
    }
  };
  
  render() {
    return (
      <div>
        <button type="button" className="collapsible" onClick={this.doThis}>
          Todo List {this.props.index}
        </button>
        <div id={`paragraph-${this.props.index}`} className="content">
          <AddTodo onAddTodo={this.props.createTodo} listId={this.props.index}/>
          <TodoList items={this.props.items}  toggleComplete={this.props.toggleComplete}  index={this.props.index} /> 
        </div>
      </div>
    );
  }
}

export default TodoLists;
