import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/operations/endpoints';

const UserManagement = () => {
    const [users, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleRoleChange = (userId, newRole) => {
        const updatedUsers = users.map(user =>
            user._id === userId ? { ...user, accountType: newRole } : user
        );
        setAllUsers(updatedUsers);
    };

    const fetchAllUsers =  async() => {
        try {
            await getAllUsers(setAllUsers)();
        } catch (err) {
            setError("Failed to fetch users. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <div className="text-center">Loading users...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Manage Users</h2>
            <ul className="space-y-4">
                {users.map(user => (
                    <li key={user._id} className="flex justify-between items-center">
                        <span className="text-gray-800">
                            {user.firstName} {user.lastName} - Role: {user.accountType}
                        </span>
                        <select
                            className="border rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => handleRoleChange(user._id, e.target.value)}
                            value={user.accountType}
                        >
                            <option value="Admin">Admin</option>
                            <option value="Task Owner">Task Owner</option>
                            <option value="Assigned User">Assigned User</option>
                        </select>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
