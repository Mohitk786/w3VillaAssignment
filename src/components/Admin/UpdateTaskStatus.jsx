import React from 'react';

const UpdateTaskStatus = ({ task, updateStatus }) => {
    return (
        <div className="mt-4">
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p className="mb-2">Status: {task.status}</p>
            <select
                className="border p-2 rounded"
                value={task.status}
                onChange={(e) => updateStatus(task.id, e.target.value)}
            >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
        </div>
    );
};

export default UpdateTaskStatus;
