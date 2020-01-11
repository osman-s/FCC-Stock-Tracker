import React, { Component } from "react";
import IssuePostForm from "./issuePostForm";
import IssueUpdateForm from "./issueUpdateForm";
import IssueDeleteForm from "./issueDeleteForm";


class IssueTracker extends Component {
  state = {
    movies: []
  };



  render() {

    return (
      <div>
        <h1></h1>
        <IssuePostForm />
        <IssueUpdateForm />
        <IssueDeleteForm />
      </div>
    );
  }
}

export default IssueTracker;
