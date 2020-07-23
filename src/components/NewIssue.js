import React from "react";

const NewIssue = ({ handleToggle, show }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="jumbotron">
      <button className="btn btn-warning" onClick={handleToggle}>
        Add New Issue
      </button>
    </div>
  );
};

export default NewIssue;
