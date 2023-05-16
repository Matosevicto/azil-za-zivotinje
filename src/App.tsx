import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ONama from './components/ONama/ONama';
import Prikaz from './components/Popis/PrikazZivotinja';
import Donacije from './components/Donacije/Donacije';
import Obavjesti from './components/Obavijesti/Obavjesti';
import Unos from './components/Unos/Unos';
import './App.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import PrikazZivotinja from './components/Popis/PrikazZivotinja';

const UserRoleContext = createContext();

function UserRoleToggle() {
  const { userRole, setUserRole } = useContext(UserRoleContext);

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="userRoleToggle"
        checked={userRole === 'admin'}
        onChange={() => setUserRole(userRole === 'korisnik' ? 'admin' : 'korisnik')}
        
      />
      <label className="form-check-label" htmlFor="userRoleToggle">
        Admin
      </label>
    </div>
  );
}

function App() {
  const [userRole, setUserRole] = useState('korisnik');
  const [zivotinje, postaviZivotinje] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/zivotinje/")
      .then(res => postaviZivotinje(res.data));
  }, []);

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      <div className='app-container'>
        <div className='top'></div>

       
        <Router>
          <div className="navbar">
            <div >
          <h1 className='title'>Azil za životinje</h1>
          </div>
          
            <Link to="/" className="nav-btn">
              O nama
            </Link>
            <Link to="/popis" className="nav-btn">
              Popis
            </Link>
            <Link to="/donacije" className="nav-btn">
              Donacije
            </Link>
            <Link to="/obavjesti" className="nav-btn">
              Obavijesti
            </Link>
            <Link to="/unos" className="nav-btn">
              Unos
            </Link>
           
            <UserRoleToggle />
          </div>
          
          <Routes>
            <Route path="/" element={<ONama />} />
            <Route path="/popis" element={<PrikazZivotinja userRole={userRole} />} />
            <Route
             path="/donacije"
             element={<Donacije userRole={userRole} />}
             />
            <Route path="/obavjesti" element={<Obavjesti userRole={userRole} />} />
            <Route
  path="/unos"
  element={
    userRole === 'admin' ? (
      <Unos dodaj={postaviZivotinje} />
    ) : (
      <Navigate to="/" replace />
    )
  }
/>
          </Routes>
        </Router>
      </div>
    </UserRoleContext.Provider>
  );
}

export default App;
