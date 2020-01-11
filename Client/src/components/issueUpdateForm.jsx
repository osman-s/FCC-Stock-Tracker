import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { issueUpdate } from "../services/issueService";

class IssueUpdateForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      text: "",
      createdby: "",
      assignedto: "",
      status: "",
      state: "open"
    },
    errors: {}
  };

  schema = {
    _id: Joi.string()
      .required()
      .label("Project Id"),
    title: Joi.string()
      .allow("")
      .label("Title"),
    text: Joi.string()
      .allow("")
      .min(5)
      .label("Description"),
    createdby: Joi.string()
      .allow("")
      .label("Created By"),
    assignedto: Joi.string()
      .allow("")
      .label("Assigned to"),
    status: Joi.string()
      .allow("")
      .label("Status"),
    state: Joi.string()
      .allow(["open", "closed"])
      .label("state")
  };

  doSubmit = async () => {
    console.log(this.state.data);
    try {
      const response = await issueUpdate(this.state.data);
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
      <div className="form-space forms-c">
        <div>
          <h1 className="left">Update Issue</h1>
          <form onSubmit={this.handleSubmit} className="widther">
            {this.renderInput("_id", "", "Project Id", "_idUp")}
            {this.renderInput("title", "", "Title  (optional)", "titleUp")}
            {this.renderInput("text", "", "Description  (optional)", "textUp")}
            {this.renderInput(
              "createdby",
              "",
              "Created By  (optional)",
              "createdbyUp"
            )}
            {this.renderInput(
              "assignedto",
              "",
              "Assigned To (optional)",
              "assignedtoUp"
            )}
            {this.renderInput("status", "", "Status (optional)", "statusUp")}

            {this.renderCheckbox("state", "Check to close issue.", ["closed"])}

            {this.renderButton("Update")}
          </form>
        </div>
      </div>
    );
  }
}

export default IssueUpdateForm;
