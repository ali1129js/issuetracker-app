import React, { Component } from "react";
import ReNewIss from "./ReNewIss";
import Grid from "./Grid";

class App extends Component {
  state = {
    issues: [
      {
        id: "uuidv4",
        severity: "high",
        assigned: "name",
        status: "Closed",
        desc: "Fix the trhing",
        due: "tomtot",
        ts: "timestamp here",
      },
      {
        id: "123456",
        severity: "high",
        assigned: "name",
        status: "Fixed",
        desc: "bl blblbl lbleresde lbglglgf ",
        due: "tomtot",
        ts: "timestamp here",
      },
    ],
    isOpen: false,
  };

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleSubmit = (newIssue) => {
    this.setState({ issues: [...this.state.issues, newIssue] });
  };
  render() {
    return (
      <div className="container">
        <h3>
          <strong>React Issue Tracker</strong>
        </h3>
        <button className="btn btn-warning" onClick={this.handleToggle}>
          Add New Issue
        </button>
        <ReNewIss show={this.state.isOpen} handleSubmit={this.handleSubmit} />
        <Grid issues={this.state.issues} />
      </div>
    );
  }
}
export default App;
