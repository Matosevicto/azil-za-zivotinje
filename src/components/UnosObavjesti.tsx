import { useState } from "react";
import axios from "axios";
import "../Styles.css"

function UnosObavjesti({ dodajObavjest }) {
  const [novaObavjest, setNovaObavjest] = useState({
    id:"",
    naslov:"",
    datum: "",
    tekst: "",
    vazno: false
  });

  const saljiPodatke = (event) => {
    event.preventDefault();
    console.log(novaObavjest);
    const zaSlanje = obradiPodatke(novaObavjest);

    axios.post("http://localhost:3001/obavijesti", zaSlanje)
    .then((rez) => {
        dodajObavjest(stanje => [...stanje, rez.data])
    });
  };
  

  function obradiPodatke(objekt) {
    return {
     id:"",
     naslov: objekt.naslov,
      datum: objekt.datum,
      tekst: objekt.tekst,
      vazno: objekt.vazno,
    };
  }
  function promjenaUlaza(event) {
    console.log(event.target);
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setNovaObavjest({ ...novaObavjest, [name]: value });
  }

  
  return (
    <form onSubmit={saljiPodatke}>
      <div>
        <label>
          Naslov:
          <input
            type="text"
            name="naslov"
            value={novaObavjest.naslov}
            onChange={promjenaUlaza}
            required
          />
        </label>
      </div>
      <div>
      <label>
          Datum:
          <input
            className="datum"
            type="date"
            name="datum"
            value={novaObavjest.datum}
            onChange={promjenaUlaza}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Tekst:
          <input
            type="text"
            name="tekst"
            value={novaObavjest.tekst}
            onChange={promjenaUlaza}
            required
          />
        </label>
      </div>
      <div>
      <label>
          Vazno:
          <input
            className="vazno"
            type="checkbox"
            name="vazno"
            checked={novaObavjest.vazno}
            onChange={promjenaUlaza}
          />
        </label>
      </div>
      <button type="submit">Spremi</button>
    </form>
  );
}
export default UnosObavjesti;