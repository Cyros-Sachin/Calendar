import React from 'react';
import Calendar from './components/Calendar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <Sidebar />
      <div className="flex-1 bg-gray-50">
        <Calendar />
      </div>
    </div>
  );
}

export default App;   // <-- IMPORTANT!
