import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyerPage from './pages/BuyerPage';
import ProfilePage from './pages/ProfilePage';
//import { UserProvider } from './Auth/UserContext'; 

const App = () => {
  return (
 //   <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BuyerPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
//    </UserProvider>
  );
};

export default App;
