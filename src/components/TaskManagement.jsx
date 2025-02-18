import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import { useNavigate } from "react-router-dom";
import { getAssignedTasks } from "../services/operations/endpoints"; 
import AssignedTask from "./AssignedTask"

const TaskManagement = () => {
  const navigate = useNavigate();
  const [assignedTasks, setAssignedTasks] = useState([]);

  const fetchAssignedTasks = async () => {
    await getAssignedTasks(setAssignedTasks)();
  }

  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem('user')); 
    if (user && user.accountType === "Admin") {
      navigate('/admin'); 
    } else {
      fetchAssignedTasks();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Task Management System</h1>
      
      <div className="w-full max-w-3xl mx-auto">
        <TaskList />
      </div>

      <AssignedTask 
        setAssignedTasks ={setAssignedTasks}
        assignedTasks={assignedTasks}
      />

    </div>
  );
};

export default TaskManagement;
