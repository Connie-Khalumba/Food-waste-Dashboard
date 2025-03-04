import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated to use Routes
import AdminDashboardContent from './components/AdminDashboardContent';
import UserDashboardContent from './components/DashboardContent'; // Renamed for clarity

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-auto"> {/* Ensure this constrains height */}
            <Routes>
              <Route path="/admin" element={<AdminDashboardContent />} />
              <Route path="/" element={<UserDashboardContent />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;