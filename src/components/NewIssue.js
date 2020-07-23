import React from "react";

const NewIssue = ({ handleToggle, show }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="jumbotron">
      <button className="btn btn-danger" onClick={handleToggle}>
        Submit
      </button>
    </div>
  );
};

export default NewIssue;
