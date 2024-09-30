import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';


function App() {

  //state isLoggedIn should be here so can be passed to Home and Login 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {    
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const storedUsername = localStorage.getItem('username');
    if (loggedInStatus && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  return (

    <Router>
      <Routes>
        <Route 
          path="/login"
          element= { isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />}
        />
        
        <Route 
          path="/home"
          element = { isLoggedIn ? <Home username={username} setIsLoggedIn={setIsLoggedIn}/> : <Navigate to="/login" />} 
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;