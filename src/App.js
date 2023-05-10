import './App.css';
import SignupPage from './pages/SignupPage';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
        
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={ <SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
