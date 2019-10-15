import React from "react";
import "./Todolists.css";

import TodoList from "../TodoList";
import AddTodo from "../AddTodo";
import FilterTodo from "./FilterTodo";

class TodoLists extends React.Component {
  constructor() {
    super();
    this.state = {
      toggle: 0,
      items: [],
      filteredList: [],
      filtered: false
    };
  }

  doThis = () => {
    if (this.state.toggle === 0) {
      document.getElementById(`paragraph-${this.props.index}`).style.display =
        "block";
      this.setState({ toggle: 1 });
    } else {
      document.getElementById(`paragraph-${this.props.index}`).style.display =
        "none";
      this.setState({ toggle: 0 });
    }
  };

  filterStuff = (text) => {
    let list = this.props.items
    let resultList = []
    list.map((x) => {
      // completed
      if(x.completed && text === "completed"){
        resultList.push(x)
      }
      // Not completed
      if(!x.completed && text === "active"){
        resultList.push(x)
      }
      // All items
      if(text === "all"){
        resultList.push(x)
      }
      return resultList
    })
    this.setState({ filteredList: resultList, filtered: true });
  }

  render() {
    return (
      <div>
        <button type="button" className="collapsible" onClick={this.doThis}>
          Todo List {this.props.index}
        </button>
        <div id={`paragraph-${this.props.index}`} className="content">
          <FilterTodo filterData={this.filterStuff}/>
          <AddTodo
            onAddTodo={this.props.createTodo}
            listId={this.props.index}
          />
          <TodoList
            items={this.state.filtered ? this.state.filteredList : this.props.items}
            toggleComplete={this.props.toggleComplete}
            index={this.props.index}
          />
        </div>
      </div>
    );
  }
}

export default TodoLists;
