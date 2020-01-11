import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { issuePost } from "../services/issueService";

class IssuePostForm extends Form {
  state = {
    data: { title: "", text: "", createdby: "", assignedto: "", status: "" },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    text: Joi.string()
      .required()
      .min(5)
      .label("Description"),
    createdby: Joi.string()
      .required()
      .label("Created By"),
    assignedto: Joi.string()
      .allow("")
      .label("Assigned to"),
    status: Joi.string()
      .allow("")
      .label("Status")
  };

  doSubmit = async () => {
    console.log(this.state.data);
    try {
      const response = await issuePost(this.state.data);
      window.location = "/projectissues";
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
         <h1>Post Issue</h1>
        <form onSubmit={this.handleSubmit} className="widther">
          {this.renderInput("title", "", "Title")}
          {this.renderInput("text", "", "Description")}
          {this.renderInput("createdby", "", "Created By")}
          {this.renderInput("assignedto", "", "Assigned To (optional)")}
          {this.renderInput("status", "", "Status (optional)")}
          {this.renderButton("Submit")}
        </form> 
        </div>
        
      </div>
    );
  }
}

export default IssuePostForm;
