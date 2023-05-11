import React, { useState } from "react";
import "../Styles.css";
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
  const saljiPodatke = (event) => {
    event.preventDefault();
    console.log(formaPodaci);
    const zaSlanje = obradiPodatke(formaPodaci);
    

    axios
      .post("http://localhost:3001/zivotinje", zaSlanje)

      .then((rez) => {
        props.dodaj((stanje) => [...stanje, rez.data]);
      });
  };

  function obradiPodatke(objekt) {
    return {
      id: "",
      ime: objekt.ime,
      vrsta: objekt.vrsta,
      spol: objekt.spol,
      starost: Number(objekt.starost),
      rasa: objekt.rasa,
      udomljen: objekt.udomljen,
      slika: objekt.slika,
      cip: objekt.cip,
      zadnjiPregled: objekt.zadnjiPregled,
      napomena: objekt.napomena,
    };
  }

  function promjenaUlaza(event) {
    console.log(event.target);
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    postaviPodatke({ ...formaPodaci, [name]: value });
  }
  
 

  const handleSpolChange = (event) => {
    const spolValue = event.target.value;
    postaviPodatke({ ...formaPodaci, spol: spolValue }); // Update the "spol" value in the state
  };
  
  return (
    <>
      <h2>Unos životinje</h2>
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
        <label htmlFor="genderSelect">Odaberi spol:</label>
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
        <label>
          Udomljen:
          <input
            className="udomljen"
            type="checkbox"
            name="udomljen"
            checked={formaPodaci.udomljen}
            onChange={promjenaUlaza}
          />
        </label>
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
        <label>
          Čip:
          <input
            className="cip"
            type="checkbox"
            name="cip"
            checked={formaPodaci.cip}
            onChange={promjenaUlaza}
          />
        </label>
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

        <button type="submit">Dodaj životinju</button>
      </form>
    </>
  );
}
export default Unos;
