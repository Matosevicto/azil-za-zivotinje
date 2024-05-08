import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "./PrikazZivotinja.css";
import UrediZivotinju from "./UrediZivotinju";

function PrikazZivotinja(props) {
  const [zivotinje, postaviZivotinje] = useState([]);
  const [vrstaFilter, postaviVrstuFilter] = useState([]);
  const [statusFilter, postaviStatusFilter] = useState([]);
  const [searchQuery, postaviSearchQuery] = useState("");
  const [selectedZivotinja, setSelectedZivotinja] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/zivotinje")
      .then((response) => postaviZivotinje(response.data))
      .catch((error) => console.log(error));
  }, []);

  const udomiZivotinju = (id) => {
    axios
      .patch(`http://localhost:3001/zivotinje/${id}`, { udomljen: true })
      .then((response) => {
    
        const updatedZivotinje = zivotinje.map((zivotinja) => {
          if (zivotinja.id === id) {
            return { ...zivotinja, udomljen: true };
          }
          return zivotinja;
        });
  
       
        postaviZivotinje(updatedZivotinje);
      })
      .catch((error) => {
        
        console.error('Error updating zivotinja:', error);
        
      });
  };
  const handleObrisiZivotinju = (id) => {
    axios
      .delete(`http://localhost:3001/zivotinje/${id}`)
      .then((response) =>
        postaviZivotinje(zivotinje.filter((zivotinja) => zivotinja.id !== id))
      )
      .catch((error) => console.log(error));
  };
  

  const handleVrstaFilterChange = (value) => {
    if (vrstaFilter.includes(value)) {
      postaviVrstuFilter(vrstaFilter.filter((vrsta) => vrsta !== value));
    } else {
      postaviVrstuFilter([...vrstaFilter, value]);
    }
  };

  const handleStatusFilterChange = (value) => {
    if (statusFilter.includes(value)) {
      postaviStatusFilter(statusFilter.filter((status) => status !== value));
    } else {
      postaviStatusFilter([...statusFilter, value]);
    }
  };

  const filtrirajZivotinje = (zivotinje) => {
    return zivotinje
      .filter((zivotinja) => {
        if (vrstaFilter.length > 0) {
          return vrstaFilter.includes(zivotinja.vrsta.toLowerCase());
        }
        return true;
      })
      .filter((zivotinja) => {
        if (statusFilter.length > 0) {
          return statusFilter.includes(
            zivotinja.udomljen ? "udomljena" : "nijeudomljena"
          );
        }
        return true;
      })
      .filter((zivotinja) => {
        if (searchQuery !== "") {
          return zivotinja.ime
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }
        return true;
      });
  };

  const openModal = (zivotinja) => {
    setSelectedZivotinja(zivotinja);
  };

  const closeModal = () => {
    setSelectedZivotinja(null);
  };

  const filtriraneZivotinje = filtrirajZivotinje(zivotinje);

  const handleUrediClick = () => {
    setIsEditing(true);
  };

  const handleUrediZatvori = () => {
    setIsEditing(false);
  };

  return (
    <>
      <h2>Popis životinja u azilu</h2>
      <div className="filtar">
        <div>
          <label>Vrsta:</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="pas"
                checked={vrstaFilter.includes("pas")}
                onChange={(e) => handleVrstaFilterChange(e.target.value)}
              />
              Pas
            </label>
            <label>
              <input
                type="checkbox"
                value="macka"
                checked={vrstaFilter.includes("macka")}
                onChange={(e) => handleVrstaFilterChange(e.target.value)}
              />
              Mačka
            </label>
            <label>
              <input
                type="checkbox"
                value="gmaz"
                checked={vrstaFilter.includes("gmaz")}
                onChange={(e) => handleVrstaFilterChange(e.target.value)}
              />
              Gmaz
            </label>
          </div>
        </div>
        <div>
          <label>Status:</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="udomljena"
                checked={statusFilter.includes("udomljena")}
                onChange={(e) => handleStatusFilterChange(e.target.value)}
              />
              Udomljena
            </label>
            <label>
              <input
                type="checkbox"
                value="nijeudomljena"
                checked={statusFilter.includes("nijeudomljena")}
                onChange={(e) => handleStatusFilterChange(e.target.value)}
              />
              Nije udomljena
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="searchQuery">Traži:</label>
          <input
            id="searchQuery"
            type="text"
            value={searchQuery}
            onChange={(e) => postaviSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="kartice">
        {filtriraneZivotinje.map((zivotinja) => (
          <div
            key={zivotinja.id}
            className="kartica"
            onClick={() => openModal(zivotinja)}
          >
            <img
              src={zivotinja.slika}
              alt={zivotinja.ime}
              height={250}
              width={320}
            />
          </div>
        ))}
      </div>
      <Popup
        className="detalji-zivotinje"
        open={selectedZivotinja !== null}
        onClose={closeModal}
      >
        {selectedZivotinja && (
          <div className="image-container">
            <img
              src={selectedZivotinja.slika}
              alt={selectedZivotinja.ime}
              height={400}
              width={500}
            />
            <h3>{selectedZivotinja.ime}</h3>
            <p>Vrsta: {selectedZivotinja.vrsta}</p>
            <p>Starost: {selectedZivotinja.starost}</p>
            <p>Spol: {selectedZivotinja.spol}</p>
            <p>Rasa: {selectedZivotinja.rasa}</p>
            <p>
              Status:{" "}
              {selectedZivotinja.udomljen ? "Udomljena" : "Nije udomljena"}
            </p>
            <p>Čipiran: {selectedZivotinja.cip ? "Da" : "Ne"}</p>
            <p>Datum zadnjeg pregleda: {selectedZivotinja.zadnjiPregled}</p>
            <p>Napomena: {selectedZivotinja.napomena}</p>
            <button
              className="udomi-zivotinju_botun"
              onClick={() => udomiZivotinju(selectedZivotinja.id)}
            >
              Udomi životinju
            </button>
            {props.userRole === "admin" && (
              <>
                <button
                  className="uredi-zivotinju_botun"
                  onClick={handleUrediClick}
                >
                  Uredi
                </button>
                <button
                  className="uredi-zivotinju_botun"
                  onClick={() => handleObrisiZivotinju(selectedZivotinja.id)}
                >
                  Izbriši
                </button>
              </>
              
            )}
            {isEditing && (
              
              <UrediZivotinju 
                ime={selectedZivotinja.ime}
                selectedZivotinja={selectedZivotinja}
                onClose={handleUrediZatvori}
              />
            )}
            
          </div>
        )}
      </Popup>
    </>
  );
}
export default PrikazZivotinja;