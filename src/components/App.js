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
      },
    ],
    isOpen: true,
  };

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    return (
      <div className="container">
        <h3>
          <strong>React Issue Tracker</strong>
        </h3>
        <NewIssue show={this.state.isOpen} handleToggle={this.handleToggle} />
        <Grid />
      </div>
    );
  }
}
export default App;
