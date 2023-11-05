import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import './App.css'
 // We import all the components we need in our app
import Navibar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Timer from "./components/generateSchedule";

 const App = () => {
 return (
   <div>
      <Navibar />
     <Routes>
        
       <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="/daily" element={<Timer />} />
     </Routes>
   </div>
 );
};
 export default App;