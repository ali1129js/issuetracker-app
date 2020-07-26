import React, { Component } from "react";
import { uuid } from "uuidv4";

class ReNewIss extends Component {
  state = {
    severity: null,
    assigned: "",
    status: "",
    desc: "",
    low: false,
    med: false,
    high: false,
  };

  handleChange = (e) => {
    this.setState({ desc: e.target.value });
  };
  handleChange2 = (e) => {
    this.setState({ assigned: e.target.value });
  };
  handleClickH = (e) => {
    this.setState({
      severity: e.target.value,
      high: true,
      med: false,
      low: false,
    });
  };
  handleClickM = (e) => {
    this.setState({
      severity: e.target.value,
      med: true,
      high: false,
      low: false,
    });
  };
  handleClickL = (e) => {
    this.setState({
      severity: e.target.value,
      low: true,
      high: false,
      med: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let newIssue = {
      ts: new Date().toDateString(),
      desc: this.state.desc,
      assigned: this.state.assigned,
      severity: this.state.severity,
      id: uuid().slice(0, 6),
      status: "Open",
    };
    this.props.handleSubmit(newIssue);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="jumbotron">
        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Description</span>
            </div>
            <input
              type="text"
              placeholder="Describe the issue"
              className="form-control"
              name="desc"
              onChange={this.handleChange}
              value={this.state.desc}
              required
            />
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text">Severity</label>
            <input
              type="button"
              className={
                this.state.high
                  ? "btn btn-danger ml-3"
                  : "btn btn-outline-danger ml-3"
              }
              onClick={this.handleClickH}
              value={"High"}
            />
            <input
              type="button"
              className={
                this.state.med
                  ? "btn btn-warning ml-3"
                  : "btn btn-outline-warning ml-3"
              }
              onClick={this.handleClickM}
              value={"Medium"}
            />
            <input
              type="button"
              className={
                this.state.low
                  ? "btn btn-info ml-3"
                  : "btn btn-outline-info ml-3"
              }
              onClick={this.handleClickL}
              value={"Low"}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Assigned to</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="assigned"
              onChange={this.handleChange2}
              value={this.state.assigned}
            />
          </div>

          <input
            type="submit"
            value="Submit"
            className="btn btn-danger"
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
}
export default ReNewIss;
