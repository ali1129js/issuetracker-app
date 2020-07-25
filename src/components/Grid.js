import React from "react";
import { uuid } from "uuidv4";
const Grid = ({ issues }) => (
  <div className="grid">
    <div className="row">
      <div className="col">Status</div>
      <div className="col">Id</div>
      <div className="col-6">Description</div>
      <div className="col">Severity</div>
      <div className="col">Create</div>
      <div className="col">Assigned</div>
      <div className="col">Due</div>
    </div>
    {issues.map((issue) => (
      <div key={uuid()} className="row">
        <div className="col">{issue.status}</div>
        <div className="col">{issue.id}</div>
        <div className="col-6">{issue.desc}</div>
        <div className="col">{issue.severity}</div>
        <div className="col">{issue.ts}</div>
        <div className="col">{issue.assigned}</div>
        <div className="col">{issue.due}</div>
      </div>
    ))}
  </div>
);

export default Grid;
