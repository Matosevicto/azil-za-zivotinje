import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "../Styles.css";

function PrikazZivotinja(props) {
  const [zivotinje, postaviZivotinje] = useState([]);
  const [vrstaFilter, postaviVrstuFilter] = useState("");
  const [statusFilter, postaviStatusFilter] = useState("");
  const [searchQuery, postaviSearchQuery] = useState("");
  const [selectedZivotinja, setSelectedZivotinja] = useState(null);

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
      .catch((error) => console.log(error));
  };

  const filtrirajZivotinje = (zivotinje) => {
    return zivotinje
      .filter((zivotinja) => {
        if (vrstaFilter !== "") {
          return zivotinja.vrsta.toLowerCase() === vrstaFilter.toLowerCase();
        }
        return true;
      })
      .filter((zivotinja) => {
        if (statusFilter !== "") {
          return zivotinja.udomljen === (statusFilter === "udomljena");
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

  
  return (
    <>
      <h2>Popis životinja u azilu</h2>
      <div className="filtar">
        <div>
          <label htmlFor="vrstaFilter">Filtriraj po vrsti:</label>
          <select
            id="vrstaFilter"
            value={vrstaFilter}
            onChange={(e) => postaviVrstuFilter(e.target.value)}
          >
            <option value="">Sve vrste</option>
            <option value="pas">Pas</option>
            <option value="macka">Macka</option>
            <option value="gmaz">Gmaz</option>
          </select>
        </div>
        <div>
          <label htmlFor="statusFilter">Filtriraj po statusu:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => postaviStatusFilter(e.target.value)}
          >
            <option value="">Svi statusi</option>
            <option value="udomljena">Udomljena</option>
            <option value="nijeudomljena">Nije udomljena</option>
          </select>
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
      <Popup open={selectedZivotinja !== null} onClose={closeModal}>
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
            <p>Rasa: {selectedZivotinja.rasa}</p>
            <p>
              Status:{" "}
              {selectedZivotinja.udomljen ? "Udomljena" : "Nije udomljena"}
            </p>
            <p>Čipiran: {selectedZivotinja.cip ? "Da" : "Ne"}</p>
            <p>Datum zadnjeg pregleda: {selectedZivotinja.zadnjiPregled}</p>
            <p>Napomena: {selectedZivotinja.napomena}</p>
             <button onClick={() => udomiZivotinju(zivotinja.id)}>
                Udomi životinju
              </button>
          </div>
        )}
      </Popup>
    </>
  );
}

export default PrikazZivotinja;
