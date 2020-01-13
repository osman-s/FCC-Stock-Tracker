import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
// import { bookComment } from "../services/bookService";
import SelectDataset from "./common/selectDataset";

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
      console.log(this.state.data.stockSymbol);
      this.props.setStock(this.state.data.stockSymbol);
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
      <div className=" ">
        <div className="">
          <div className="container1">
            <SelectDataset
              setDataset={this.props.setDataset}
              className="sizer-1"
            />
            <form onSubmit={this.handleSubmit} className="">
              <div className="widther">
                {this.renderInput("stockSymbol", "", "Enter stock symbol")}
                {this.renderButton("Submit")}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchStockForm;
