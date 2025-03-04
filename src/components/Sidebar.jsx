import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-xl font-bold text-green-600">RediFu</h1>
      </div>
      <nav className="mt-6">
        <ul>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Link to="/" className="text-gray-600 hover:text-green-600">
              Dashboard (User)
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Link to="/admin" className="text-gray-600 hover:text-green-600">
              Admin Dashboard
            </Link>
          </li>
          {['Pickup Schedule', 'Manage Menu', 'Customer Review', 'Settings', 'Payment', 'Accounts', 'Help'].map((item) => (
            <li key={item} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <span className="text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;