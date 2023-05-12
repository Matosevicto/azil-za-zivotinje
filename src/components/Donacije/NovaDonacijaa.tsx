import { useState } from "react";
import axios from "axios";


function NovaDonacijaa({ dodajDonaciju }) {
  const [novaDonacija, setNovaDonacija] = useState({
    id:"",
    kategorija:"nudi",
    tip: "",
    vrijednost: "",
    opis: "",
  });

  const saljiPodatke = (event) => {
    event.preventDefault();
    console.log(novaDonacija);
    const zaSlanje = obradiPodatke(novaDonacija);

    axios.post("http://localhost:3001/obavijesti", zaSlanje)
    .then((rez) => {
      dodajDonaciju(stanje => [...stanje, rez.data])
    });
  };
  

  function obradiPodatke(objekt) {
    return {
     id:"",
     kategorija:"nudi",
      tip: objekt.tip,
      vrijednost: objekt.vrijednost,
      opis: objekt.opis,
    };
  }

  function promjenaUlaza(event) {
    console.log(event.target);
    const { name, value } = event.target;
    setNovaDonacija({ ...novaDonacija, [name]: value });
  }

  return (
    <form onSubmit={saljiPodatke}>
      <div>
        <label>
          Tip:
          <input
            type="text"
            name="tip"
            value={novaDonacija.tip}
            onChange={promjenaUlaza}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Vrijednost:
          <input
            type="number"
            name="vrijednost"
            value={novaDonacija.vrijednost}
            onChange={promjenaUlaza}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Opis:
          <input
            type="text"
            name="opis"
            value={novaDonacija.opis}
            onChange={promjenaUlaza}
            required
          />
        </label>
      </div>
      <button type="submit">Spremi</button>
    </form>
  );
}

export default NovaDonacijaa;
