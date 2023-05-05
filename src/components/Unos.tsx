import React, { useState } from "react";
import "../Styles.css";

function Unos() {
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

  const slajiPodatke = (event) => {
    event.preventDefault();
    console.log(podaci);
  };
  function promjenaUlaza(event) {
    const { name, value } = event.target;
    postaviPodatke({ ...podaci, [name]: value });
  }
  

  return (
    <>
    <h2>Unos životinje</h2>
      <form onSubmit={slajiPodatke}>
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
