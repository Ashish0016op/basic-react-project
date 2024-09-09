import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [studentName, setStudentName] = useState('');
  const [monitorName, setMonitorName] = useState('');
  const [data, setData] = useState([]);
  const [vote, setVote] = useState({
    Suresh: 0,
    Vijay: 0,
    Raghav: 0,
  });

  const StudentNameHandler = (e) => {
    setStudentName(e.target.value);
  };

  const handleMonitorName = (e) => {
    setMonitorName(e.target.value);
  };

  const formHandler = (event) => {
    event.preventDefault();
    if (studentName === '' || monitorName === '') {
      alert("Please fill out both fields.");
      return;
    }
    setVote((prev) => ({
      ...prev,
      [monitorName]: prev[monitorName] + 1,
    }));
    setData((prevData) => [
      ...prevData,
      {
        id: Math.random(),
        student_name: studentName,
        monitor_name: monitorName,
      },
    ]);
    setStudentName(''); 
    setMonitorName(''); 
  };

  const handleDelete = (id, monitorName) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    setVote((prevVote) => ({
      ...prevVote,
      [monitorName]: prevVote[monitorName] - 1,
    }));
  };

  return (
    <div>
      <div className="Heading">
        <div>
          <h2>Class Monitor Vote</h2>
        </div>

        <div>
          <p>Total votes: {data.length}</p>
        </div>
      </div>
      <div className="form">
        <form onSubmit={formHandler}>
          <label htmlFor="student_name">Student Name: </label>
          <input type="text" value={studentName} onChange={StudentNameHandler} />
          {"  "}
          <label htmlFor="monitor">Choose Monitor: </label>
          <select value={monitorName} onChange={handleMonitorName}>
            <option value="">choose</option>
            <option value="Suresh">Suresh</option>
            <option value="Vijay">Vijay</option>
            <option value="Raghav">Raghav</option>
          </select>
          {"   "}
          <button type="submit">Vote</button>
        </form>
      </div>
      <div className="monitor_box">
        <div>
          <p className="monitor_name">Suresh</p>
          <p>Total {vote.Suresh}</p>
          {data
            ?.filter((item) => item.monitor_name === "Suresh")
            .map((item) => (
              <div className="voted_student" key={item.id}>
                <p>{item.student_name}</p>
                <button onClick={() => handleDelete(item.id, "Suresh")}>
                  Delete
                </button>
              </div>
            ))}
        </div>
        <div>
          <p className="monitor_name">Vijay</p>
          <p>Total {vote.Vijay}</p>
          {data
            ?.filter((item) => item.monitor_name === "Vijay")
            .map((item) => (
              <div className="voted_student" key={item.id}>
                <p>{item.student_name}</p>
                <button onClick={() => handleDelete(item.id, "Vijay")}>
                  Delete
                </button>
              </div>
            ))}
        </div>
        <div>
          <p className="monitor_name">Raghav</p>
          <p>Total {vote.Raghav}</p>
          {data
            ?.filter((item) => item.monitor_name === "Raghav")
            .map((item) => (
              <div className="voted_student" key={item.id}>
                <p>{item.student_name}</p>
                <button onClick={() => handleDelete(item.id, "Raghav")}>
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
