import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 p-4 overflow-auto md:p-6">
                <Routes>
                  <Route path="/" element={<DashboardContent />} />
                  <Route path="/pickup-schedule" element={<PickupSchedule />} />
                  <Route path="/manage-menu" element={<ManageMenu />} />
                  <Route path="/customer-review" element={<CustomerReview />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/accounts" element={<Accounts />} />
                  <Route path="/help" element={<Help />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;