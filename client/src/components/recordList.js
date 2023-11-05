import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function refreshPage() {
  window.location.reload(false);
}
const Record = (props) => (
 <tr>
   <td>{props.record.topic}</td>
   <td>{props.record.deadline}</td>
   <td>{props.record.estimated_hours}</td>
   <td>{props.record.priority_level}</td>
   <td>{props.record.type}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
         refreshPage();
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
export default function RecordList() {
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
   }
    getRecords();
    return;
 }, [records.length]);
  // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:3000/${id}`, {
     method: "DELETE"
   });
    const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
  // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
  // This following section will display the table with the records of individuals.
  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      <div style={{display:"flex", justifyContent:"center"}}>
         <h3>Your TODOs</h3>
      </div>
      <table className="table table-striped" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Due Date</th>
            <th>Estimated Hours</th>
            <th>Priority Level</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}