import React, { Component } from "react";

class SelectDataset extends Component {
  state = {
    data: { active: "0" }
  };

  handleClick = async ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = parseInt(input.value);

    await this.setState({ data });
    await this.props.setDataset(input.value);
  };
  render() {
    let { active } = this.state.data;
    return (
      <nav aria-label="..." className="mr-3">
        <ul className="pagination ">
          <button
            className={active === 0 ? "btn btn-primary" : "btn border"}
            name="active"
            onClick={this.handleClick}
            value="0"
          >
            1
          </button>
          <button
            className={active === 1 ? "btn btn-primary" : "btn border"}
            onClick={this.handleClick}
            name="active"
            value="1"
          >
            2
          </button>
          <button
            className={active === 2 ? "btn btn-primary" : "btn border"}
            onClick={this.handleClick}
            name="active"
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
