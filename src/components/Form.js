import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Form(props) {
  return (
    <div>
      <form onSubmit={props.addStudent} className="mb-3">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Enter student name:{" "}
          </label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            placeholder="name"
            value={props.name}
            required
          />
        </div>
        <div>
          <label htmlFor="rollno" className="form-label">
            Enter roll number:{" "}
          </label>
          <input
            type="text"
            className="form-control"
            name="roll"
            id="rollno"
            placeholder="roll no"
            value={props.roll}
            required
          />
        </div>
        <div>
          <label htmlFor="intime" className="form-label">
            Enter check in time:{" "}
          </label>
          <input
            id="intime"
            type="time"
            name="intime"
            className="form-control"
            value={props.intime}
            required
          />
        </div>
        <div>
          <label htmlFor="outtime" className="form-label">
            Enter check out time:{" "}
          </label>
          <input
            type="time"
            name="outtime"
            className="form-control"
            id="outtime"
            value={props.outtime}
          />
        </div>
        <button className="btn btn-success mt-2">Submit</button>
      </form>
    </div>
  );
}

export default Form;
