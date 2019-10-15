import React, { Component } from "react";
import "./Todolists.css";

class FilterTodo extends Component {
  state = {
    display: "none",
    status: "all"
  };

  dropDown = () => {
    if(this.state.display === "flex"){
      this.setState({
        display: "none"
      });
    }else{
      this.setState({
        display: "flex"
      });
    }
  };

  render() {
    return (
      <div className="dropdown">
        <button onClick={this.dropDown} className="dropbtn">
          Filter Todos.....
        </button>
        <div
          style={{ display: this.state.display }}
          id="filterList"
          className="dropdown-content"
        >
          <a href="#ft" onClick={() => this.props.filterData("completed")}>
            Completed
          </a>
          <a href="#ft" onClick={() => this.props.filterData("active")}>
            Active
          </a>
          <a href="#ft" onClick={() => this.props.filterData("all")}>
            All
          </a>
        </div>
      </div>
    );
  }
}

export default FilterTodo;
