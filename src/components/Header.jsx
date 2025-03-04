import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 rounded-lg w-1/3"
      />
      <div className="flex items-center space-x-4">
        <span>Eunice Wairimu</span>
        <img src="/path-to-avatar.jpg" alt="Avatar" className="w-8 h-8 rounded-full" />
      </div>
    </header>
  );
};

export default Header;