import React, { useEffect, useState } from "react";


// Object with timer inside table with one column and multiple rows
 export default function Timer() {
   const [time, setTime] = useState(0);
   const [timerOn, setTimeOn] = useState(false);
   useEffect(() => {
     let interval = null;
     if (timerOn) {
       interval = setInterval(() => {
            setTime((prevTime) => prevTime + 10);
        }, 10);
        } else if (!timerOn) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }
    , [timerOn]);
    return (
        <div>
            <h1>Timer: {time / 1000}</h1>
            <button onClick={() => setTimeOn(true)}>Start</button>
            <button onClick={() => setTimeOn(false)}>Stop</button>
            <button onClick={() => setTime(0)}>Reset</button>
        </div>
    );
}
