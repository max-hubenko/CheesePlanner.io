import React, { Component } from 'react';
import './MonthSchedule.css';

class MonthSchedule extends Component {
    state = {
        daysData: Array(31).fill(''), // Initialize an array for 31 days
    };

    handleDayChange = (dayIndex, newText) => {
        const { daysData } = this.state;
        daysData[dayIndex] = newText;
        this.setState({ daysData });
    };

    render() {
        const { daysData } = this.state;

        return (
            <div className="month-schedule">
                <h1>Monthly Schedule</h1>
                <div className="calendar-grid">
                    {daysData.map((text, dayIndex) => (
                        <div className="day-block" key={dayIndex}>
                            <div className="day-label">{dayIndex + 1}</div>
                            <textarea
                                value={text}
                                onChange={(e) => this.handleDayChange(dayIndex, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default MonthSchedule;
