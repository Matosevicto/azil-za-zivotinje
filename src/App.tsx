import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ONama from "./components/ONama";
import Popis from "./components/Popis";
import Donacije from "./components/Donacije";
import Obavjesti from "./components/Obavjesti";
import Unos from "./components/Unos";
import "./App.css";
import axios from "axios";

const UserRoleContext = createContext();

function UserRoleToggle() {
  const { userRole, setUserRole } = useContext(UserRoleContext);

  return (
    <div>
      <label className="userRoleToggle" htmlFor="userRoleToggle">
        Admin
      </label>
      <input
        className="role"
        type="checkbox"
        id="userRoleToggle"
        checked={userRole === "admin"}
        onChange={() =>
          setUserRole(userRole === "korisnik" ? "admin" : "korisnik")
        }
      />
    </div>
  );
}

function App() {
  const [userRole, setUserRole] = useState("korisnik");

  const [zivotinje, postaviZivotinje] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/zivotinje/")
      .then((res) => postaviZivotinje(res.data));
  }, []);

  const handleNovaŽivotinja = (novaDonacija) => {
    const newDonacija = {
      id: donacije.length + 1,
      tip: novaDonacija.tip,
      vrijednost: novaDonacija.vrijednost,
      opis: novaDonacija.opis,
    };
  };

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      <div>
        <h1>Azil za životinje</h1>
        <Router>
          <div className="navbar">
            <Link to="/oNama" className="nav-btn">
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
            <Link to="/" className="nav-btn">
              Povratak na početnu stranicu
            </Link>
            <UserRoleToggle />
          </div>
          <div></div>
          <Routes>
            <Route path="/oNama" element={<ONama />} />
            <Route path="/popis" element={<Popis />} />
            <Route path="/donacije" element={<Donacije />} />
            <Route path="/obavjesti" element={<Obavjesti />} />
            <Route path="/unos" element={<Unos dodaj={postaviZivotinje} />} />
          </Routes>
        </Router>
      </div>
    </UserRoleContext.Provider>
  );
}

export default App;
