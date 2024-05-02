import { useState, useEffect } from "react";
import Modal from "react-modal";
import UnosObavijesti from "./UnosObavijesti";
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

  const obrisiObavijest = async (index) => {
    const obavijestToDelete = obavijesti[index];
    
    try {
      
      await axios.delete(`http://localhost:3001/obavijesti/${obavijestToDelete.id}`);
      
  
      const noveObavijesti = obavijesti.filter((_, i) => i !== index);
      setObavijesti(noveObavijesti);
    } catch (error) {
      console.error('Problem pri brisanju obavijesti:', error);
      
    }
  };

  return (
    <Card id="obavjesti">
  <div>
    {props.userRole === "admin" && (
      <button onClick={() => setShowModal(true)}>Nova obavijest</button>
    )}
    <Modal
      className="modal"
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <UnosObavijesti dodajObavjest={handleNovaObavijest} />
    </Modal>
  </div>
  <h2>Obavijesti</h2>
  <table>
    <thead>
      <tr>
        <th>Naslov</th>
        <th>Datum</th>
        <th>Tekst</th>
        {props.userRole === "admin" && <th>Akcije</th>}
      </tr>
    </thead>
    <tbody>
      {obavijesti.map((obavijest, index) => (
        <tr key={index} className={obavijest.vazno ? "vazno" : ""}>
          <td className="centriranje">{obavijest.naslov}</td>
          <td className="centriranje">{obavijest.datum}</td>
          <td className="centriranje">{obavijest.tekst}</td>
          {props.userRole === "admin" && (
            <td className="centriranje">
              <button  type="button" onClick={() => obrisiObavijest(index)}>
                Obriši
              </button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
</Card>


  );
}

export default Obavjesti;
