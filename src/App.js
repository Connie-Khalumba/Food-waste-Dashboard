// src/App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboardContent from './components/AdminDashboardContent';
import UserDashboardContent from './components/DashboardContent';
import { ThemeProvider } from './context/ThemeContext'; // Updated path

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6 overflow-auto">
              <Routes>
                <Route path="/admin" element={<AdminDashboardContent />} />
                <Route path="/" element={<UserDashboardContent />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;