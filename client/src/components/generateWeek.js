import React, { useState, useEffect } from "react";
import './WeeklySchedule.css'; // Import a CSS file for styling


const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// today's date
const today = new Date();
// check db's dates
// if db has schedule for today, display it
// else, display default schedule




export default function WeeklySchedule() {
    const initialSchedule = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
    };
    
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
        return;

    }, [records.length]);



    const [schedule, setSchedule] = useState(initialSchedule);


    const handleTaskChange = (day, index, task) => {
        const updatedSchedule = { ...schedule };
        updatedSchedule[day][index] = task;
        setSchedule(updatedSchedule);
    };


    return (
        <div className="weekly-schedule-container">
            <h1 className="weekly-schedule-header" >Weekly Schedule</h1>
            <table className="weekly-schedule">
                <thead>
                    <tr>
                        <th></th>
                        {weekdays.map((day) => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 9 }).map((_, index) => (
                        <tr key={index}>
                            <td className={index % 2 === 0 ? 'task-cell' : 'break-cell'}>
                                {index % 2 === 0 ? 'Tasks' : 'Break'}
                            </td>
                            {weekdays.map((day) => (
                                <td key={day}>
                                    <TaskInput
                                        day={day}
                                        index={index}
                                        task={schedule[day][index] || ''}
                                        onTaskChange={handleTaskChange}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


function TaskInput({ day, index, task, onTaskChange }) {
    const handleChange = (e) => {
        onTaskChange(day, index, e.target.value);
    };


    return (
        <input
            className="task-input"
            type="text"
            value={task}
            onChange={handleChange}
            placeholder="Enter task"
        />
    );
}
