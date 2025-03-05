import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { useUser } from '../context/UserContext'; // Import for role-based rendering
import backgroundImage from '../Assets/conifers-1867371_1280.jpg';

const Accounts = () => {
  const { isDarkMode } = useTheme();
  const { userRole } = useUser(); // Get user role for conditional rendering
  const [users, setUsers] = useState([
    { id: 1, name: 'Eunice Wairimu', role: 'Resident', status: 'Active', email: 'eunice@example.com' },
    { id: 2, name: 'Org Admin', role: 'Organization', status: 'Active', email: 'org@example.com' },
  ]);
  const [newUser, setNewUser] = useState({ name: '', role: 'Resident', status: 'Active', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setNewUser({ name: '', role: 'Resident', status: 'Active', email: '' });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const columns = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Role', accessorKey: 'role' },
    { header: 'Status', accessorKey: 'status' },
    { header: 'Email', accessorKey: 'email' },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <button
          onClick={() => handleDelete(row.original.id)}
          className={`text-red-600 hover:text-red-800 ${isDarkMode ? 'dark:text-red-400' : ''}`}
        >
          Delete
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className={`h-full overflow-auto ${isDarkMode ? 'dark:bg-gray-900' : ''}`}
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use the imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className={`text-xl md:text-2xl font-bold mb-2 md:mb-4 ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}>Accounts</h1>
      <div className="grid grid-cols-1 gap-2 md:gap-4 lg:gap-6 md:grid-cols-2">
        {/* Add/Edit User (Resident can only view/edit their own, Organization can add/edit all) */}
        {userRole === 'organization' ? (
          <div className={`bg-white p-2 md:p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
            <h2 className={`text-base md:text-lg font-semibold mb-1 md:mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Add User</h2>
            <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className={`w-full p-1 md:p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className={`w-full p-1 md:p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className={`w-full p-1 md:p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
              >
                <option value="Resident">Resident</option>
                <option value="Organization">Organization</option>
              </select>
              <select
                value={newUser.status}
                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                className={`w-full p-1 md:p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button
                type="submit"
                className={`w-full p-1 md:p-2 bg-green-600 text-white rounded hover:bg-green-700 ${isDarkMode ? 'dark:bg-green-500 dark:hover:bg-green-600' : ''}`}
              >
                Add User
              </button>
            </form>
          </div>
        ) : (
          <div className={`bg-white p-2 md:p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
            <h2 className={`text-base md:text-lg font-semibold mb-1 md:mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>My Account</h2>
            <div className="space-y-2 md:space-y-4">
              {users
                .filter((user) => user.role === 'Resident' && user.name === 'Eunice Wairimu') // Mock for current user
                .map((user) => (
                  <div key={user.id} className={`p-2 md:p-4 rounded ${isDarkMode ? 'dark:bg-gray-700' : 'bg-gray-100'}`}>
                    <p className={isDarkMode ? 'dark:text-white' : 'text-gray-800'}>Name: {user.name}</p>
                    <p className={isDarkMode ? 'dark:text-gray-400' : 'text-gray-500'}>Role: {user.role}</p>
                    <p className={isDarkMode ? 'dark:text-gray-400' : 'text-gray-500'}>Status: {user.status}</p>
                    <p className={isDarkMode ? 'dark:text-gray-400' : 'text-gray-500'}>Email: {user.email}</p>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className={`mt-2 p-1 md:p-2 text-red-600 hover:text-red-800 ${isDarkMode ? 'dark:text-red-400' : ''}`}
                    >
                      Delete Account
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Users Table (Visible to Organizations, Filtered for Residents) */}
        <div className={`bg-white p-2 md:p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
          <h2 className={`text-base md:text-lg font-semibold mb-1 md:mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
            {userRole === 'organization' ? 'Users' : 'My Account Details'}
          </h2>
          <div className="overflow-x-auto">
            <table className={`w-full ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className={isDarkMode ? 'dark:bg-gray-700' : 'bg-gray-200'}>
                    {headerGroup.headers.map((column) => (
                      <th
                        key={column.id}
                        className={`p-1 md:p-2 text-left font-semibold ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}
                      >
                        {flexRender(column.columnDef?.header, column.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className={isDarkMode ? 'dark:bg-gray-700' : 'bg-white'}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`p-1 md:p-2 ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;