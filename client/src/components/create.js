import React, { useState } from "react";
import { useNavigate } from "react-router";
export default function Create() {
    const [form, setForm] = useState({
        topic: "", deadline: "", estimated_hours: "", priority_level: "", type: "",
    });
    const navigate = useNavigate();
    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    // This function refreshes the form.
    function refreshPage() {
        window.location.reload(false);
    }
    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newTODO = { ...form };
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
        // This will navigate us back to the homepage.
        navigate("/");
        refreshPage();
        
    }
    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Create New Schedule</h3>
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
                        type="date"
                        className="form-control"
                        id="deadline"
                        value={form.deadline}
                        onChange={(e) => updateForm({ deadline: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="estimated-hours">Estimated Hours</label>
                    <input
                        type="text"
                        className="form-control"
                        id="estimated-hours"
                        value={form.estimated_hours}
                        onChange={(e) => updateForm({ estimated_hours: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="priority-level">Priority Level (1-5)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="priority-level"
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
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Schedule"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}