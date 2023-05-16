import { useState, useEffect } from "react";
import Modal from "react-modal";
import UnosObavjesti from "./UnosObavjesti";
import axios from "axios";
import "./Obavijesti.css";
import Card from "react-bootstrap/Card";

function Obavjesti(props) {
  const [obavijesti, setObavijesti] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/obavijesti")
      .then((response) => setObavijesti(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleNovaObavijest = (novaObavijest) => {
    const newObavijest = {
      id: obavijesti.length + 1,
      naslov: novaObavijest.naslov,
      datum: novaObavijest.datum,
      tekst: novaObavijest.tekst,
      vazno: novaObavijest.vazno,
    };
    setObavijesti([...obavijesti, newObavijest]);
    setShowModal(false);
  };

  const obrisiObavijest = (index) => {
    const noveObavijesti = [...obavijesti];
    noveObavijesti.splice(index, 1);
    setObavijesti(noveObavijesti);
  };

  return (
    <Card id="obavjesti">
      <div>
        {props.userRole === "admin" && (
          <>
            <button onClick={() => setShowModal(true)}>Nova obavjest</button>
          </>
        )}
        <Modal
          className="modal"
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <UnosObavjesti dodajObavjest={handleNovaObavijest} />
        </Modal>
      </div>
      <h2>Obavijesti</h2>
      {obavijesti.length === 0 ? (
        <p>Nema obavijesti.</p>
      ) : (
        <ul>
          {obavijesti.map((obavijest, index) => (
            <li key={index} className={obavijest.vazno ? "vazno" : ""}>
              <h3>{obavijest.naslov}</h3>
              <p>{obavijest.tekst}</p>
              {props.userRole === "admin" && (
                <>
                  <button type="button" onClick={() => obrisiObavijest(index)}>
                    Obriši
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export default Obavjesti;
