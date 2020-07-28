import React from "react";
import { uuid } from "uuidv4";
import "./grid.css";

const Grid = ({ issues, getBackground, changeStatus }) => (
  <div className="container">
    <div className="grid">
      <div className="row bg-light">
        <div className="col ">Status</div>
        <div className="col">Id</div>
        <div className="col-4">Description</div>
        <div className="col-2">Severity</div>
        <div className="col-2">Created</div>
        <div className="col">Assigned</div>
        <div className="col">Due</div>
      </div>
      {issues.map((issue, i) => (
        <div key={uuid()} className="row">
          <div className="col">
            <div className="status">
              <div
                onClick={() => changeStatus(i)}
                className={getBackground(issue.status)}
              >
                {issue.status}
              </div>
            </div>
          </div>
          <div className="col">{issue.id}</div>
          <div className="col-4">{issue.desc}</div>
          <div className="col-2">
            <div className="status">
              <div className={getBackground(issue.severity)}>
                {issue.severity}
              </div>
            </div>
          </div>
          <div className="col-2">{issue.ts}</div>
          <div className="col">{issue.assigned}</div>
          <div className="col">{issue.due}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Grid;
