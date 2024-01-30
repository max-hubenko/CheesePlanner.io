
import React, { useEffect, useState } from "react";

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
    <div className="p-4 bg-gray-200 rounded border border-gray-300 mb-4">
      <h1 className="text-2xl font-bold mb-2">
        Timer: {seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`}
      </h1>
      <p className="text-lg">{message}</p>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setTimeOn(true)}
        >
          Start
        </button>
        <button
          className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-700"
          onClick={() => setTimeOn(false)}
        >
          Stop
        </button>
        <button
          className="bg-gray-500 text-black px-4 py-2 rounded hover:bg-gray-700"
          onClick={() => setTime(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

const TODO = (props) => (
  <tr>
    <td>{props.record.topic}</td>
    <td><Timer /></td>
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
    <div className=" w-[100vw] flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold mb-4 w-full">Your TODOs</h1>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="bg-gray-200 p-2">Topic</th>
            <th className="bg-gray-200 p-2">Time</th>
          </tr>
        </thead>
        <tbody>{showSchedule()}</tbody>
      </table>
    </div>
  );
}
