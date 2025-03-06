import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardContent from './components/DashboardContent';
import PickupSchedule from './components/PickupSchedule';
import ManageMenu from './components/ManageMenu';
import CustomerReview from './components/CustomerReview';
import Settings from './components/Settings';
import Payment from './components/Payment';
import Accounts from './components/Accounts';
import Help from './components/Help';
import OrganizationDashboard from './components/OrganizationDashboard';
import Login from './components/Login'; // Import Login component
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider, useUser } from './context/UserContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log('Toggling Sidebar:', !isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    console.log('Closing Sidebar');
  };

  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <div className="flex h-screen">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            <div className="flex-1 flex flex-col">
              <Header toggleSidebar={toggleSidebar} />
              <main className="flex-1 p-4 overflow-auto md:p-6">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<DashboardWrapper />} />
                  <Route path="/pickup-schedule" element={<PickupSchedule />} />
                  <Route path="/manage-menu" element={<ManageMenu />} />
                  <Route path="/customer-review" element={<CustomerReview />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/accounts" element={<Accounts />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/organization" element={<OrganizationDashboard />} />
                  <Route path="*" element={<Navigate to="/login" replace />} /> {/* Redirect unauthenticated users to login */}
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}

const DashboardWrapper = () => {
  const { userRole, user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }
  if (userRole === 'organization') {
    return <Navigate to="/organization" replace />; // Redirect organizations to /organization
  }
  return <DashboardContent />; // Default to resident dashboard
};

export default App;