import React, { useReducer, useState } from "react";

function UrediZivotinju({ selectedZivotinja, onClose }) {
  const [formaPodaci, setFormaPodaci] = useState(selectedZivotinja);

  const promjenaUlaza = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormaPodaci((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const spremiPromjene = (e) => {
    e.preventDefault();
    const updatedData = formaPodaci;

    // Make a PUT request to update the data on the server
    axios
      .put(`api/animals/${selectedZivotinja.id}`, updatedData)
      .then((response) => {
        // Handle the response from the server
        if (response.status === 200) {
          // Data successfully updated
          // Close the editing mode by calling `onClose` function
          onClose();
        } else {
          // Handle error case
          // Display an error message or take appropriate action
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error('Error:', error);
      });
  };
   
  

  return (
    <>
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
    </>
  );
}

export default UrediZivotinju
