import { useState, useEffect } from "react";
import Modal from "react-modal";
import NovaDonacijaa from "./NovaDonacijaa";
import Card from 'react-bootstrap/Card';
import "./Donacije.css";
import axios from "axios";

function Donacije() {
  const [donacije, setDonacije] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleNovaDonacija = (novaDonacija) => {
    const newDonacija = {
      id: donacije.length + 1,
      tip: novaDonacija.tip,
      vrijednost: novaDonacija.vrijednost,
      opis: novaDonacija.opis,
    };
    setDonacije([...donacije, newDonacija]);
    setShowModal(false);
  };
  const handleAcceptDonacija = (id) => {
    const donacijaIndex = donacije.findIndex((d) => d.id === id);
    const updatedDonacija = {
      ...donacije[donacijaIndex],
      kategorija: "donirano",
    };

    axios
      .put(`http://localhost:3001/donacije/${id}`, {
        id: "",
        kategorija: updatedDonacija.kategorija,
        tip: updatedDonacija.tip,
        vrijednost: updatedDonacija.vrijednost,
        opis: updatedDonacija.opis,
      })
      .then(() => {
        const newDonacije = [...donacije];
        newDonacije[donacijaIndex] = updatedDonacija;
        setDonacije(newDonacije);
      })
      .catch((error) => console.log(error));
  };

  const handleObrisiDonaciju = (id) => {
    axios
      .delete(`http://localhost:3001/donacije/${id}`)
      .then((response) =>
        setDonacije(donacije.filter((donacija) => donacija.id !== id))
      )
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/donacije")
      .then((response) => setDonacije(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Card id="donacije-card">
      <button id="novaDonacijaBtn"   onClick={() => setShowModal(true)}>Nova donacija</button>
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <NovaDonacijaa dodajDonaciju={handleNovaDonacija} />
      </Modal>

      <h2>Tražimo:</h2>
      <table>
        <thead>
          <tr>
            <th>Tip</th>
            <th>Vrijednost</th>
            <th>Opis</th>
          </tr>
        </thead>
        <tbody>
          {donacije
            .filter((donacija) => donacija.kategorija === "trazi")
            .map((donacija) => (
              <tr key={donacija.id}>
                <td>{donacija.tip}</td>
                <td>{donacija.vrijednost}</td>
                <td>{donacija.opis}</td>
                <td>
                  <button onClick={() => handleAcceptDonacija(donacija.id)}>
                    Donirano
                  </button>

                  <button onClick={() => handleObrisiDonaciju(donacija.id)}>
                    Izbriši
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <hr />

      <h2>Nudi se:</h2>
      <table>
        <thead>
          <tr>
            <th>Tip</th>
            <th>Vrijednost</th>
            <th>Opis</th>
          </tr>
        </thead>
        <tbody>
          {donacije
            .filter((donacija) => donacija.kategorija === "nudi")
            .map((donacija) => (
              <tr id="podaci-donacija" key={donacija.id}>
                <td>{donacija.tip}</td>
                <td>{donacija.vrijednost}</td>
                <td>{donacija.opis}</td>
                <td>
                  <button onClick={() => handleAcceptDonacija(donacija.id)}>
                    Prihvati
                  </button>

                  <button onClick={() => handleObrisiDonaciju(donacija.id)}>
                    Izbriši
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <hr />
      <h2>Donirano:</h2>
      <table>
        <thead>
          <tr>
            <th>Tip</th>
            <th>Vrijednost</th>
            <th>Opis</th>
          </tr>
        </thead>
        <tbody>
          {donacije
            .filter((donacija) => donacija.kategorija === "donirano")
            .map((donacija) => (
              <tr key={donacija.id}>
                <td>{donacija.tip}</td>
                <td>{donacija.vrijednost}</td>
                <td>{donacija.opis}</td>
                <td>
                  <button onClick={() => (donacija.id)}>
                    Ponovi
                  </button>

                  <button onClick={() => handleObrisiDonaciju(donacija.id)}>
                    Izbriši
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <hr />
    </Card>
  );
}

export default Donacije;
