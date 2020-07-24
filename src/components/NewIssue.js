import React, { useState } from "react";

const NewIssue = ({ handleToggle, show }) => {
  const [newIss, setNew] = useState({
    desc: "",
    severity: 1,
    assigned: "",
    ts: new Date(),
    id: "uuidv4()",
  });
  const [desc, setDesc] = useState("");
  const [severity, setSevr] = useState(0);
  const [assigned, setAss] = useState("");

  const handleClick = (e) => {
    let value = e.target.value;
    console.log(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDesc("");
    setSevr(0);
    setAss("");
  };
  //no modal BS
  if (!show) {
    return null;
  }

  return (
    <div className="jumbotron">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Description</span>
          </div>
          <input
            type="text"
            placeholder="Describe the issue"
            className="form-control"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Severity</label>

          <input
            type="button"
            className="btn btn-outline-danger"
            onClick={handleClick}
            value={"High"}
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Assigned to</span>
          </div>
          <input
            type="text"
            className="form-control"
            value={assigned}
            onChange={(e) => setAss(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Submit"
          className="btn btn-danger"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};
const optStyl = {
  backgroundColor: "green",
};
export default NewIssue;
