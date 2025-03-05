import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
// import 'react-accessible-accordion/dist/react-accessible-accordion.css'; // Correct import for default styles
import '../styles/accordion.css'; //

const Help = () => {
  const { isDarkMode } = useTheme();
  const [ticket, setTicket] = useState({ subject: '', message: '' });
  const [tickets, setTickets] = useState([]); // Mock data, replace with API

  const handleSubmit = (e) => {
    e.preventDefault();
    setTickets([...tickets, { ...ticket, id: Date.now(), status: 'Open', date: new Date().toLocaleDateString() }]);
    setTicket({ subject: '', message: '' });
  };

  return (
    <div className={`p-4 md:p-6 ${isDarkMode ? 'dark:bg-gray-900 dark:text-white' : 'bg-white'}`}>
      <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}>Help</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* FAQs */}
        <div className={`bg-white p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
          <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>FAQs</h2>
          <Accordion className={isDarkMode ? 'dark:text-white' : ''}>
            {['How do I schedule a pickup?', 'What happens to my waste?', 'How do I contact support?'].map((question, index) => (
              <AccordionItem key={index}>
                <AccordionItemButton className={`p-2 rounded ${isDarkMode ? 'dark:bg-gray-700 dark:hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  {question}
                </AccordionItemButton>
                <AccordionItemPanel className={isDarkMode ? 'dark:text-gray-400' : 'text-gray-500'}>
                  Answer here...
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Us */}
        <div className={`bg-white p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
          <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Contact Us</h2>
          <p className={isDarkMode ? 'dark:text-gray-400' : 'text-gray-500'}>Email: support@redifu.com</p>
          <p className={isDarkMode ? 'dark:text-gray-400' : 'text-gray-500'}>Phone: +1-800-123-4567</p>
          <p className={isDarkMode ? 'dark:text-gray-400' : 'text-gray-500'}>Address: 123 Waste Lane, Food City</p>
        </div>

        {/* Support Tickets */}
        <div className={`bg-white p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''} md:col-span-2`}>
          <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Support Tickets</h2>
          <form onSubmit={handleSubmit} className="space-y-4 mb-4">
            <input
              type="text"
              placeholder="Subject"
              value={ticket.subject}
              onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
              className={`w-full p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
            />
            <textarea
              placeholder="Message"
              value={ticket.message}
              onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
              className={`w-full p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
            />
            <button
              type="submit"
              className={`w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 ${isDarkMode ? 'dark:bg-green-500 dark:hover:bg-green-600' : ''}`}
            >
              Submit Ticket
            </button>
          </form>
          <ul className="space-y-2">
            {tickets.map((ticket) => (
              <li key={ticket.id} className={`p-2 rounded ${isDarkMode ? 'dark:bg-gray-700' : 'bg-gray-100'}`}>
                <p className={isDarkMode ? 'dark:text-white' : 'text-gray-800'}>{ticket.subject}</p>
                <p className={isDarkMode ? 'dark:text-gray-400' : 'text-gray-500'}>Date: {ticket.date}, Status: {ticket.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Help;