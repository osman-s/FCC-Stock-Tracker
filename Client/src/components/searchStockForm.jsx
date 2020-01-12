import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { bookComment } from "../services/bookService";

class SearchStockForm extends Form {
  state = {
    data: { stockSymbol: "" },
    errors: {}
  };

  schema = {
    stockSymbol: Joi.string()
      .required()
      .label("BookId")
  };

  doSubmit = async () => {
    try {
      // await bookComment(this.state.data);
      // this.props.refresh();
    //   window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="forms-c">
        <div>
          <h1></h1>
          <form onSubmit={this.handleSubmit} className="widther">
            {this.renderInput("stockSymbol", "", "Enter stock symbol")}
            {this.renderButton("Submit")}
          </form>
        </div>
      </div>
    );
  }
}

export default SearchStockForm;
