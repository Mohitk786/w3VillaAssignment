import React, { useEffect, useState } from 'react';
import TaskListDetails from './TaskListDetails';
import { getUserLists, getAllLists, addList } from "../services/operations/endpoints";

const TaskList = () => {
    const user = JSON.parse(localStorage.getItem('user')); 
    const [allTasks, setAllTasks] = useState([]);
    const [newListName, setNewListName] = useState('');
    const [expandedTaskListId, setExpandedTaskListId] = useState(null);

    const fetchAllTasks = async () => {
        user.accountType === "Admin" ? getAllLists(setAllTasks)() : getUserLists(setAllTasks)();
    };

    useEffect(() => {
        fetchAllTasks();
        // eslint-disable-next-line
    }, []);

    const handleCreateTaskList = async() => {
        if (newListName.trim()) { 
            await addList(newListName, allTasks, setAllTasks)();
            setNewListName(''); // Clear the input after adding the list
        }
    };

    // Handle toggle for task list details
    const toggleTaskList = (listId) => {
        setExpandedTaskListId(expandedTaskListId === listId ? null : listId);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Task Lists</h2>
            <div className="flex mb-4">
                <input
                    className="border border-gray-300 p-2 rounded-lg flex-grow"
                    type="text"
                    placeholder="New Task List Name"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                />
                <button
                    onClick={handleCreateTaskList}
                    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Create Task List
                </button>
            </div>

            <ul className="space-y-4">
                {allTasks.map((list) => (
                    <li key={list._id} className="border border-gray-200 p-4 rounded-lg transition-shadow hover:shadow-lg">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleTaskList(list._id)}>
                            <h3 className="text-lg font-bold text-gray-800">{list.name}</h3>
                            <span className="text-gray-600">{expandedTaskListId === list._id ? '−' : '+'}</span> {/* Toggle icon */}
                        </div>
                        {expandedTaskListId === list._id && <TaskListDetails taskList={list} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
