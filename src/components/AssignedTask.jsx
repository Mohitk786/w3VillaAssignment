import React from 'react'
import {updateTask } from "../services/operations/endpoints"; 

const AssignedTask = ({assignedTasks, setAssignedTasks}) => {

  return (
    <div className="mt-8 w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Tasks Assigned to Me</h2>
      <ul className="space-y-4">
        {assignedTasks && assignedTasks.map(task => (
          <li key={task._id} className="p-4 border border-gray-300 rounded-lg transition-shadow hover:shadow-lg">
            <p className="font-bold text-lg">{task.name}</p>
            <p className="text-gray-700">{task.description}</p>
            <p className="text-gray-500">Due Date: {task.dueDate}</p>
            <p className={`text-sm font-medium ${task.status === 'Completed' ? 'text-green-600' : task.status === 'In Progress' ? 'text-yellow-600' : 'text-red-600'}`}>
              Status: {task.status}
              <span className={`inline-block w-2 h-2 rounded-full ml-2 ${task.status === 'Completed' ? 'bg-green-600' : task.status === 'In Progress' ? 'bg-yellow-600' : 'bg-red-600'}`}></span>
            </p>
            <div className="flex items-center mt-2">
              <select 
                className="border border-gray-300 p-2 rounded-md flex-grow"
                value={task.status}
                onChange={async (e) => await updateTask(task._id, e.target.value, setAssignedTasks, assignedTasks)()} 
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default AssignedTask