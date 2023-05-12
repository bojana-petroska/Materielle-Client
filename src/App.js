import './App.css';
import SignupPage from './pages/SignupPage';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { add } from 'google-fonts';
import ProfilePage from './pages/ProfilePage';

add({
  Montserrat: true,
  weights: [300, 500, 600],
});

function App() {
  return (
    <div className="App" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        
      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="/signup" element={ <SignupPage />} />
        <Route path="/login" element={ <LoginPage />} />
        <Route path="/profile" element={ <ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
