import Form from "./components/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

function App() {
  const [show, setShow] = useState(false);
  const [studentCount, setStudentCount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [students, setStudents] = useState([]);

  const addStudent = (e) => {
    e.preventDefault();
    const newStudent = {
      name: e.target[0].value,
      roll: e.target[1].value,
      intime: e.target[2].value,
      outtime: e.target[3].value,
    };
    console.log(newStudent);
    setStudents((students) => {
      students.push(newStudent);
      return students;
    });
    setShow((show) => !show);
    console.log("students", students);
    console.log(e);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(() => new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currHrs = date.getHours();
    const currMins = date.getMinutes();
    let count = 0;
    for (let student of students) {
      if (student.intime == "") continue;
      if (student.outtime == "") {
        count++;
        continue;
      }
      const inTimeHrs = parseInt(student.intime.substring(0, 2));
      const inTimeMins = parseInt(student.intime.substring(3));
      const outTimeHrs = parseInt(student.outtime.substring(0, 2));
      const outTimeMins = parseInt(student.outtime.substring(3));
      if (outTimeHrs > currHrs) count++;
      else if (outTimeHrs == currHrs && outTimeMins >= currMins) count++;
    }
    setStudentCount(count);
  }, [date, students]);

  const showForm = () => {
    console.log("clicked");
    setShow((show) => !show);
  };

  const updateCheckOutTime = (roll) => {
    const student = students.filter((student) => student.roll === roll);
    setStudents((students) => {
      student[0].outtime =
        new Date().getHours() + ":" + new Date().getMinutes();
      return students;
    });
    console.log(student);
  };

  return (
    <div className="container">
      <h1 className="mt-3 text-center">Attendence List</h1>
      <h3 className="mt-5 text-center">
        Total no. of present students at this time: <b>{studentCount}</b>
      </h3>
      <table className="table table-striped mt-5">
        <tr>
          <th>Name</th>
          <th>Roll No.</th>
          <th>In time</th>
          <th>Out time</th>
        </tr>
        {students.length > 0 &&
          students.map((student) => (
            <tr key={student.roll}>
              <td>{student.name}</td>
              <td>{student.roll}</td>
              <td>{student.intime}</td>
              <td>
                {student.outtime ? (
                  student.outtime
                ) : (
                  <button
                    className="btn btn-warning"
                    onClick={() => updateCheckOutTime(student.roll)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
      </table>
      {show && <Form addStudent={addStudent} />}
      {show ? (
        <button className="btn btn-danger" onClick={showForm}>
          Cancel
        </button>
      ) : (
        <button className="btn btn-primary" onClick={showForm}>
          Add Student
        </button>
      )}
    </div>
  );
}

export default App;
