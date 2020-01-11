import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import IssueTracker from "./components/issueTracker";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import ProjectIssues from "./components/projectIssues";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="">
          <Switch>
            <Route path="/projectissues" component={ProjectIssues} />
            <Route
              path="/issuetracker"
              render={props => (
                <IssueTracker {...props} user={this.state.user} />
              )}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/issuetracker" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
