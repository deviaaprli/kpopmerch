import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState } from 'react'
import BuyerPage from './pages/BuyerPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuyerPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
