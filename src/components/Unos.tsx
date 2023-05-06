import React, { useState } from "react";
import "../Styles.css";
import axios from 'axios';

function Unos(props) {
  const [podaci, postaviPodatke] = useState({
    ime: "",
    vrsta: "",
    spol: "",
    starost: "",
    rasa: "",
    udomljen: "",
    slika: "",
    cip: "",
    zadnjiPregled: "",
    napomena: "",
  });
  const [udomljen, postaviUdomljen] = useState(false);
  const [cip, postaviCip] = useState(false);

  function obradiPodatke(objekt){
    return {
      "zivotinja" : {
        "ime" : objekt.ime,
        "vrsta": objekt.vrsta,
        "spol": objekt.spol,
        "starost":Number(objekt.starost),
        "rasa": objekt.rasa,
        "udomljen":objekt.udomljen,
        "slika":objekt.slika,
        "cip":objekt.cip,
        "zadnjiPregled":objekt.zadnjiPregled,
        "napomena":objekt.napomena

      }
     
    }
  }
  const saljiPodatke = (event) => {
    event.preventDefault();
    console.log(podaci);
  
    const zaSlanje = obradiPodatke(podaci);
  
    axios.post("http://localhost:3001/zivotinje", zaSlanje)
      .then(ziv => {
        axios.get("http://localhost:3001/zivotinje")
          .then(ziv => props.dodaj(ziv.data));
      });
  };
  function promjenaUlaza(event) {
    const { name, value } = event.target;
    postaviPodatke({ ...podaci, [name]: value });
  }
  

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
            value={podaci.ime}
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
            value={podaci.vrsta}
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
            value={podaci.starost}
            onChange={promjenaUlaza}
            required
          />
        </label>
        <label>
          Rasa:
          <input
            className="rasa"
            type="text"
            name="rasa"
            value={podaci.rasa}
            onChange={promjenaUlaza}
            required
          />
        </label>
        <label>
          Udomljen:
          <input
            className="udomljen"
            type="checkbox"
            checked={udomljen}
            onChange={(event) => postaviUdomljen(event.target.checked)}
          />
        </label>
        <label>
          Slika:
          <input
            className="slika"
            type="url"
            name="slika"
            value={podaci.slika}
            onChange={promjenaUlaza}
            required
          />
        </label>
        <label>
          Čip:
          <input
            className="cip"
            type="checkbox"
            checked={cip}
            onChange={(event) => postaviCip(event.target.checked)}
          />
        </label>
        <label>
          Datum zadnjeg pregleda:
          <input
            className="zadnji-pregled"
            type="date"
            name="zadnjiPregled"
            value={podaci.zadnjiPregled}
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
            value={podaci.napomena}
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
