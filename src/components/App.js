import React, { Component } from "react";
import NewIssue from "./NewIssue";
import Grid from "./Grid";

class App extends Component {
  state = {
    issues: [
      {
        id: "uuidv4",
        severity: "high",
        assigned: "name",
        status: "open",
        desc: "Fix the trhing",
        due: "tomtot",
        ts: "timestamp here",
      },
      {
        id: "3424sf2354sefsdrw2412342wersderfsf",
        severity: "high",
        assigned: "name",
        status: "open",
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
  render() {
    console.log(this.state.issues);
    return (
      <div className="container">
        <h3>
          <strong>React Issue Tracker</strong>
        </h3>
        <button className="btn btn-warning" onClick={this.handleToggle}>
          Add New Issue
        </button>
        <NewIssue show={this.state.isOpen} handleToggle={this.handleToggle} />
        <Grid issues={this.state.issues} />
      </div>
    );
  }
}
export default App;
