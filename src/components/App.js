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
        desc: "News API only works in development mode.",
        due: "Yesterday",
        ts: "Last week ",
      },
      {
        id: "f55e72",
        severity: "High",
        assigned: "name",
        status: "Open",
        desc: "Lorem ipsum dolor sit amet.",
        due: "Never",
        ts: "timestamp ",
      },
      {
        id: "39b0af",
        severity: "Low",
        assigned: "name",
        status: "Fixed",
        desc: "Consectetur adipisicing elit.",
        due: "Not Set",
        ts: "10:13:00 AM ",
      },
      {
        id: "61447c",
        severity: "Low",
        assigned: "name",
        status: "Fixed",
        desc: "Facilis impedit quo nobis soluta obcaecati.",
        due: "Not Set",
        ts: "8:53:00 AM ",
      },
      {
        id: "d1630e",
        severity: "Medium",
        assigned: "name",
        status: "Closed",
        desc: "Magni exercitationem error.",
        due: "Not Set",
        ts: "12:52:59 PM ",
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
  changeStatus = (i) => {
    const newArr = [...this.state.issues];
    newArr[i].status = "Closed";
    this.setState({ issues: newArr });
  };
  render() {
    return (
      <div className="container">
        <h3 className="m-4">
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
        <Grid
          issues={this.state.issues}
          getBackground={this.getBackground}
          changeStatus={this.changeStatus}
        />
      </div>
    );
  }
}
export default App;
