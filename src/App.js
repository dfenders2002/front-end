import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import User from './Pages/User';
import Admin from './Pages/Admin';


function App() {
  const user = JSON.parse(window.sessionStorage.getItem('context'));
  var userType = '';
  if (user !== null) {
    userType = user.userType;
  }

  function isUser() {
    if (userType === 'User') {
      return true;
    } else {
      return false;
    }
  }

  function isAdmin() {
    if (userType === 'Admin') {
      return true;
    } else {
      return false;
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={isUser() ? <User /> : <Login />} />
        <Route path="/admin" element={isAdmin() ? <Admin /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
