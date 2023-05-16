import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PrikazZivotinja.css";

function UrediZivotinju({ selectedZivotinja, onClose }) {
  const [formaPodaci, setFormaPodaci] = useState({});

  useEffect(() => {
    setFormaPodaci(selectedZivotinja);
  }, [selectedZivotinja]);

  const promjenaUlaza = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormaPodaci((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const spremiPromjene = (e) => {
    e.preventDefault();
    const updatedData = formaPodaci;

    axios
      .put(`http://localhost:3001/zivotinje/${selectedZivotinja.id}`, updatedData)
      .then((response) => {
        if (response.status === 200) {
          onClose();
        } else {
         
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    
    <>
    <div className="uredivanje-zivotinje">
      <h2>Uređivanje životinje</h2>
      <form onSubmit={spremiPromjene}>
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
            type="text"
            name="starost"
            value={formaPodaci.starost}
            onChange={promjenaUlaza}
            required
          />
        </label>
        <label>
          Spol:
          <input
            type="text"
            name="spol"
            value={formaPodaci.spol}
            onChange={promjenaUlaza}
            required
          />
        </label>
        <label>
          Rasa:
          <input
            type="text"
            name="rasa"
            value={formaPodaci.rasa}
            onChange={promjenaUlaza}
            required
          />
        </label>
        <label>
          Status udomljavanja:
          <select
            name="udomljen"
            value={formaPodaci.udomljen}
            onChange={promjenaUlaza}
          >
            <option value={true}>Udomljena</option>
            <option value={false}>Nije udomljena</option>
          </select>
        </label>
        <label>
          Čipiran:
          <input
            type="checkbox"
            name="cip"
            checked={formaPodaci.cip}
            onChange={promjenaUlaza}
          />
        </label>
        <label>
          Datum zadnjeg pregleda:
          <input
            type="text"
            name="zadnjiPregled"
            value={formaPodaci.zadnjiPregled}
            onChange={promjenaUlaza}
            required
          />
        </label>
        <label>
          Napomena:
          <textarea
            name="napomena"
            value={formaPodaci.napomena}
            onChange={promjenaUlaza}
          />
        </label>
        <button type="submit">Spremi promjene</button>
      </form>
      </div>
    </>
  );
}

export default UrediZivotinju
