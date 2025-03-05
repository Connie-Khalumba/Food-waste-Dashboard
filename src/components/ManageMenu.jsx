import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import backgroundImage from '../Assets/conifers-1867371_1280.jpg'

const ManageMenu = () => {
  const { isDarkMode } = useTheme();
  const [categories, setCategories] = useState([
    { id: 1, name: 'Organic Waste', price: '$5/kg', status: 'Active' },
    { id: 2, name: 'Non-Organic Waste', price: '$3/kg', status: 'Active' },
  ]);
  const [newCategory, setNewCategory] = useState({ name: '', price: '', status: 'Active' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategories([...categories, { ...newCategory, id: Date.now() }]);
    setNewCategory({ name: '', price: '', status: 'Active' });
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const columns = [
    { header: 'Name', accessorKey: 'name' }, // Use 'header' (lowercase) for column header text
    { header: 'Price', accessorKey: 'price' },
    { header: 'Status', accessorKey: 'status' },
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
    data: categories,
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
      <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}>Manage Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Add/Edit Categories */}
        <div className={`bg-white p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
          <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Add Category</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              className={`w-full p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
            />
            <input
              type="text"
              placeholder="Price (e.g., $5/kg)"
              value={newCategory.price}
              onChange={(e) => setNewCategory({ ...newCategory, price: e.target.value })}
              className={`w-full p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
            />
            <select
              value={newCategory.status}
              onChange={(e) => setNewCategory({ ...newCategory, status: e.target.value })}
              className={`w-full p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button
              type="submit"
              className={`w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 ${isDarkMode ? 'dark:bg-green-500 dark:hover:bg-green-600' : ''}`}
            >
              Add Category
            </button>
          </form>
        </div>

        {/* Categories Table */}
        <div className={`bg-white p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
          <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Categories</h2>
          <div className="overflow-x-auto">
            <table className={`w-full ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className={isDarkMode ? 'dark:bg-gray-700' : 'bg-gray-200'}>
                    {headerGroup.headers.map((column) => (
                      <th
                        key={column.id}
                        className={`p-2 text-left font-semibold ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}
                      >
                        {flexRender(column.columnDef.header, column.getContext())} {/* Ensure correct access to header */}
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
                        className={`p-2 ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())} {/* Ensure correct access to cell */}
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

export default ManageMenu;