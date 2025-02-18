import React from 'react';
import TaskList from '../TaskList';
import UserManagement from './UserManagement';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                    <UserManagement />
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                    <TaskList />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
