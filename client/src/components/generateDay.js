import React, { useEffect, useState } from "react";
import { spacedRepetitionDate } from "./generateSchedule";

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

  // Create a statement which takes in the input of time and displays certain statements based on the time
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

  // Display time in minutes
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return (
    <div>
      <h1>
        Timer: {seconds < 10 ? `${minutes}:0${seconds} ` : `${minutes}:${seconds} `}
      </h1>
      <p>{message}</p>
      <button onClick={() => setTimeOn(true)}>Start</button>
      <button onClick={() => setTimeOn(false)}>Stop</button>
      <button onClick={() => setTime(0)}>Reset</button>
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
  // This method fetches the records from the database.
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
      /*
    for(var record in records) {
        var dates = spacedRepetitionDate(record);
        for( var date in dates) {
            if(date == Date.now()) {
                setRecords(records);
            }
        }
   }
   */
}
    getRecords();
    return;
    
 }, [records.length]);
  // This method will map out the records on the table
 function showSchedule() {
   return records.map((record) => {
     return (
       <TODO
            record={record}
            key={record._id}
       />
     );
   });
 }
  // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Your TODOs</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
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