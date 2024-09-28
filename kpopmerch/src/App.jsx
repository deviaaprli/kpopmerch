import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState } from 'react'
import BuyerPage from './pages/BuyerPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuyerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
