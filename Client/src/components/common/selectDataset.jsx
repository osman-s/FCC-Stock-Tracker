import React, { Component } from "react";

class SelectDataset extends Component {
  state = {
    active: "0"
  };

  handleClick = e => {
    this.state.active = e.target.value
    this.props.setDataset(e.target.value);
    // console.log(this.props)
  };
  render() {
    let { active } = this.state;
    return (
      <nav aria-label="..." className="mr-3">
        <ul className="pagination ">
          <button
            className={active == 0 ? "btn btn-primary" : "btn border"}
            onClick={this.handleClick}
            value="0"
          >
            1
          </button>
          <button
            className={active == 1 ? "btn btn-primary" : "btn border"}
            onClick={this.handleClick}
            value="1"
          >
            2
          </button>
          <button
            className={active == 2 ? "btn btn-primary" : "btn border"}
            onClick={this.handleClick}
            value="2"
          >
            3
          </button>
        </ul>
      </nav>
    );
  }
}

export default SelectDataset;
