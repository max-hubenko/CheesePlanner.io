import React, { useState } from "react";
import "../App.css";

export default function Create() {
    const [form, setForm] = useState({
        topic: "", deadline: "", estimated_hours: "", priority_level: "", type: "",
    });
    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newTODO = { ...form };
        if (newTODO.topic === "" || newTODO.deadline === "" || newTODO.estimated_hours === "" || newTODO.priority_level === "" || newTODO.type === "") {
            window.alert("Please fill in all the fields.");
            return;
        }
        await fetch("http://localhost:3000/record/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTODO),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        setForm({ topic: "", deadline: "", estimated_hours: "", priority_level: "", type: "", });

    }
    // This following section will display the form that takes the input from the user.
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", height: "100vh" }}>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "10vh" }} className="form-box">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h3>Create New Schedule</h3>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="topic">Topic</label>
                        <input
                            type="text"
                            className="form-control"
                            id="topic"
                            value={form.top}
                            onChange={(e) => updateForm({ topic: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="deadline">Deadline</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="deadline"
                            value={form.deadline}
                            onChange={(e) => updateForm({ deadline: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="estimated-hours">Estimated Hours</label>
                        <input
                            type="number"
                            className="form-control"
                            id="estimated-hours"
                            value={form.estimated_hours}
                            onChange={(e) => updateForm({ estimated_hours: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="priority-level">Priority Level (1-5, level 1 is the highest priority)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="priority-level"
                            min="1"
                            max="5"
                            value={form.priority_level}
                            onChange={(e) => updateForm({ priority_level: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="todoOptions"
                                id="typeExam"
                                value="Exam"
                                checked={form.type === "Exam"}
                                onChange={(e) => updateForm({ type: e.target.value })}
                            />
                            <label htmlFor="typeExam" className="form-check-label">Exam</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="todoOptions"
                                id="typeAssignment"
                                value="Assignment"
                                checked={form.type === "Assignment"}
                                onChange={(e) => updateForm({ type: e.target.value })}
                            />
                            <label htmlFor="typeAssignment" className="form-check-label">Assignment</label>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "2vh" }} className="form-group">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: "100%" }}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}