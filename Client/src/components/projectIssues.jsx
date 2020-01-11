import React, { Component } from "react";
import IssuePostForm from "./issuePostForm";
import { getPosts, issueUpdate, issueDelete } from "../services/issueService";

class ProjectIssues extends Component {
  state = {
    issues: []
  };
  async componentDidMount() {
    const { data: issues } = await getPosts();
    this.setState({ issues });
    console.log(this.state);
  }

  handleClose = async _id => {
    const closePost = {
      _id: _id,
      state: "closed"
    };
    try {
      const response = await issueUpdate(closePost);
      window.location = "/projectissues";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  handleDelete = async _id => {
    const deletePost = {
      _id: _id
    };
    console.log(deletePost);
    try {
      const response = await issueDelete(deletePost);
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
    const posts = this.state.issues;
    return (
      <div className="forms-c">
        <div className="padder">
          <h1 className=""></h1>
        <IssuePostForm/>
        {posts.map(post => (
          <div className="projbox" key={post._id}>
            <div className="project-issues">
              <div className="project-id">{post._id}</div>
              <p className="project-title">
                {post.title} ({post.state})
              </p>
              <div className="project-text">
                {post.text} <br></br>
                {post.status}
              </div>
              <div className="project-keys">
                <b>Created by:</b> {post.createdby} <b>Assigned to: </b>
                {post.assignedto}
              </div>
              <div className="project-keys">
                <b>Created on:</b> {post.createdon}
                {post.updatedon !== post.createdon && (
                  <span>
                    {" "}
                    <b>Last Updated: </b>
                    {post.updatedon}
                  </span>
                )}
              </div>
              <div className="issue-resdiv">
                <span
                  onClick={() => this.handleClose(post._id)}
                  className="issue-resolver"
                >
                  close{" "}
                </span>
                <span
                  onClick={() => this.handleDelete(post._id)}
                  className="issue-resolver"
                >
                  delete
                </span>
              </div>
            </div>
          </div>
        ))}
        </div>
        
      </div>
    );
  }
}

export default ProjectIssues;
