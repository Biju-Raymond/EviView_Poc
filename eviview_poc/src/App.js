import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataConnections from './pages/DataConnections';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/data-connections" element={<DataConnections />} />
      </Routes>
    </Router>
  );
};

export default App;
