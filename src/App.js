import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboardContent from './components/AdminDashboardContent';
import UserDashboardContent from './components/DashboardContent';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="flex h-screen">
          {/* Sidebar - Hidden on mobile, visible on md+ screens, toggleable on mobile */}
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <div className="flex-1 flex flex-col">
            {/* Header with toggle button for mobile */}
            <Header toggleSidebar={toggleSidebar} />
            <main className="flex-1 p-4 overflow-auto md:p-6">
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