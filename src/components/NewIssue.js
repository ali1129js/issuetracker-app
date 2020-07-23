import React from "react";

const NewIssue = ({ handleToggle, show }) => {
  if (!show) {
    return null;
  }
  const backdropStyle = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 50,
  };

  // The modal "window"
  const modalStyle = {
    backgroundColor: "#fff",
    borderRadius: 5,
    maxWidth: 500,
    minHeight: 300,
    margin: "0 auto",
    padding: 30,
  };
  return (
    <div className="jumbotron">
      <button className="btn btn-danger" onClick={handleToggle}>
        Submit
      </button>
      <div className="backdrop" style={{ backdropStyle }}>
        <div className="modal" style={{ modalStyle }}></div>
      </div>
    </div>
  );
};

export default NewIssue;
