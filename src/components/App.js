import React, { Component } from "react";
import ReNewIss from "./ReNewIss";
import Grid from "./Grid";

class App extends Component {
  state = {
    issues: [
      {
        id: "uuidv4",
        severity: "High",
        assigned: "name",
        status: "Closed",
        desc: "News API only works in development mode",
        due: "Yesterday",
        ts: "Last week ",
      },
      {
        id: "123456",
        severity: "High",
        assigned: "name",
        status: "Fixed",
        desc: ".............",
        due: "Never",
        ts: "timestamp ",
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
  //testing
  getBackground = (item) => {
    if (item === "High") {
      return "bg-danger";
    } else if (item === "Medium") {
      return "bg-warning";
    } else if (item === "Low") {
      return "bg-info";
    } else if (item === "Fixed") {
      return "bg-success";
    } else if (item === "Open") {
      return "bg-primary";
    } else if (item === "Closed") {
      return "bg-secondary";
    }
  };
  render() {
    return (
      <div className="container">
        <h3>
          <strong>React Issue Tracker</strong>
        </h3>
        <button
          className="btn btn-outline-success mb-2"
          onClick={this.handleToggle}
        >
          Open a New Issue
        </button>
        <ReNewIss
          show={this.state.isOpen}
          handleSubmit={this.handleSubmit}
          handleToggle={this.handleToggle}
        />
        <Grid issues={this.state.issues} getBackground={this.getBackground} />
      </div>
    );
  }
}
export default App;
