import React, { useState } from "react";
import './WeeklySchedule.css'; // Import a CSS file for styling


const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];


export default function WeeklySchedule() {
    const initialSchedule = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
    };


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
