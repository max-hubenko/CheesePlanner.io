import React, { useEffect, useState } from "react";
import { spacedRepetitionDate } from "./generateSchedule";
import "./TechFeelingStyles.css"; // Import your CSS file

function Timer() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimeOn] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else if (!timerOn) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  let message = "Timer is stopped";
  if (timerOn) {
    if (time >= 0 && time < 1500000) {
      message = "Study Time";
    } else if (time >= 1500000 && time < 1800000) {
      message = "Please Take a 5 Minute Break";
    } else if (time >= 1800000) {
      message = "Resetting";
      setTime(0);
      setTimeOn(false);
    }
  }

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return (
    <div className="tech-feeling-timer">
      <h1 className="timer-header">
        Timer: {seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`}
      </h1>
      <p className="timer-message">{message}</p>
      <div className="timer-buttons">
        <button className="timer-button start" onClick={() => setTimeOn(true)}>Start</button>
        <button className="timer-button stop" onClick={() => setTimeOn(false)}>Stop</button>
        <button className="timer-button reset" onClick={() => setTime(0)}>Reset</button>
      </div>
    </div>
  );
}

const TODO = (props) => (
  <tr>
    <td>{props.record.topic}</td>
    <Timer />
  </tr>
);

export default function TodoList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:3000/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
  }, []);

  function showSchedule() {
    return records.map((record) => (
      <TODO record={record} key={record._id} />
    ));
  }

  return (
    <div className="tech-feeling-todo-list">
      <h3 className="todo-list-header">Your TODOs</h3>
      <table className="tech-feeling-table table-striped">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{showSchedule()}</tbody>
      </table>
    </div>
  );
}
