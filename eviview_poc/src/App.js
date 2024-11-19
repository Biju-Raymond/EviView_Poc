import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataConnections from './pages/DataConnections';
import DataTableBuilder from './pages/DataTableBuilder';
import VisualizationBuilder from './pages/VisualizationBuilder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataConnections />} />
        <Route path="/data-table-builder" element={<DataTableBuilder />} />
        <Route path="/visualization-builder" element={<VisualizationBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
