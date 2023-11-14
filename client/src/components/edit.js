import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
export default function Edit() {
    const [form, setForm] = useState({
        topic: "", deadline: "", estimated_hours: "", priority_level: "", type: "",
        records: [],
    });
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:3000/record/${params.id.toString()}`);
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }
            setForm(record);
        }
        fetchData();
        return;
    }, [params.id, navigate]);
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
    async function onSubmit(e) {
        e.preventDefault();
        const editedSchedule = {
            name: form.name,
            deadline: form.deadline,
            estimated_hours: form.estimated_hours,
            priority_level: form.priority_level,
            type: form.type,
        };
        if(editedSchedule.topic === "" || editedSchedule.deadline === "" || editedSchedule.estimated_hours === "" || editedSchedule.priority_level === "" || editedSchedule.type === "") {
            window.alert("Please fill in all the fields.");
            return;
        }

        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:3000/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedSchedule),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        refreshPage();
        navigate("/");
    }
    // This following section will display the form that takes input from the user to update the data.
    return (
        <div className="form-box">
            <h3 className="page-title">Update Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="topic">Topic: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="topic"
                        value={form.topic}
                        onChange={(e) => updateForm({ topic: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="deadline">Deadline </label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="deadline"
                        value={form.deadline}
                        onChange={(e) => updateForm({ deadline: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="estimated-hours">Estimated Hours </label>
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
                <br />

                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Record"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}