import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import "./Unos.css";
import axios from "axios";

function Unos(props) {
  const [formaPodaci, postaviPodatke] = useState({
    id:"",
    ime: "",
    vrsta: "",
    spol: "",
    starost: "",
    rasa: "",
    udomljen: false,
    slika: "",
    cip: false,
    zadnjiPregled: "",
    napomena: "",
  });
  const saljiPodatke = async (event) => {
    event.preventDefault();
    if (!formaPodaci.ime || !formaPodaci.vrsta || !formaPodaci.starost || !formaPodaci.spol || !formaPodaci.rasa  || !formaPodaci.slika || !formaPodaci.zadnjiPregled|| !formaPodaci.napomena) {
      alert('Molim ispuniti sva polja');
      return;
    }
    
    
    try {
      await axios.post('http://localhost:3001/zivotinje', {
      id: "",
      ime: formaPodaci.ime,
      vrsta: formaPodaci.vrsta,
      spol: formaPodaci.spol,
      starost: Number(formaPodaci.starost),
      rasa: formaPodaci.rasa,
      udomljen: formaPodaci.udomljen,
      slika: formaPodaci.slika,
      cip: formaPodaci.cip,
      zadnjiPregled: formaPodaci.zadnjiPregled,
      napomena: formaPodaci.napomena,
    });
  alert('Životinja sigurno spremljena');
} catch (error) {
  console.error('Problem u spremanju životinje:', error);
  alert('Problem u spremanju životinje');
}
};

function promjenaUlaza(event) {
  const { name, value, type, checked } = event.target;
  const newValue = type === "checkbox" ? checked : value;
  postaviPodatke({ ...formaPodaci, [name]: newValue });
}


const handleSpolChange = (event) => {
  const spolValue = event.target.value;
  postaviPodatke({ ...formaPodaci, spol: spolValue });
};




  
  return (
    <Card className="unos-card">
      <h2 className="unos-title">Unos životinje</h2>
      <form onSubmit={saljiPodatke}>
        <label>
          Ime:
          <input
            className="ime"
            type="text"
            name="ime"
            value={formaPodaci.ime}
            onChange={promjenaUlaza}
            required
          />
        </label>
        <label>
          Vrsta:
          <input
            className="vrsta"
            type="text"
            name="vrsta"
            value={formaPodaci.vrsta}
            onChange={promjenaUlaza}
            required
          />
        </label>
        <label>
          Starost:
          <input
            className="starost"
            type="number"
            name="starost"
            value={formaPodaci.starost}
            onChange={promjenaUlaza}
            required
          />
          </label>
        <label htmlFor="genderSelect" className="genderSelect-title">Spol:</label>
        <select
          id="genderSelect"
          value={formaPodaci.spol} 
          onChange={handleSpolChange}
          required
        >
          <option value="">Odaberi</option>
          <option value="muško">Muško</option>
          <option value="žensko">Žensko</option>
        </select>
        <label>
          Rasa:
          <input
            className="rasa"
            type="text"
            name="rasa"
            value={formaPodaci.rasa}
            onChange={promjenaUlaza}
            required
          />
        </label>
        <div id="udomljen">
        <label >
          Udomljen:
          <input
            className="udomljen"
            type="checkbox"
            name="udomljen"
            checked={formaPodaci.udomljen}
            onChange={promjenaUlaza}
          />
        </label>
        </div>
        <label>
          Slika:
          <input
            className="slika"
            type="url"
            name="slika"
            value={formaPodaci.slika}
            onChange={promjenaUlaza}
            required
          />
        </label>
        <div id="cip">
        <label >
          Čip:
          <input
            className="cip"
            type="checkbox"
            name="cip"
            checked={formaPodaci.cip}
            onChange={promjenaUlaza}
          />
        </label>
        </div>
        <label>
          Datum zadnjeg pregleda:
          <input
            className="zadnji-pregled"
            type="date"
            name="zadnjiPregled"
            value={formaPodaci.zadnjiPregled}
            onChange={promjenaUlaza}
            required
          />
        </label>
        <div id="napomena">
        <label>
          Napomena:
          <input
            className="napomena"
            type="text"
            name="napomena"
            value={formaPodaci.napomena}
            onChange={promjenaUlaza}
            required
          />
        </label>
        </div>

        <button id="dodaj-zivotinju" type="submit">Dodaj životinju</button>
      </form>
    </Card>
  );
}
export default Unos;