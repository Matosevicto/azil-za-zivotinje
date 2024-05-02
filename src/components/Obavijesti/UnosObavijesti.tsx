import { useState } from "react";
import axios from "axios";


function UnosObavijesti({ dodajObavjest }) {
  const [novaObavijest, setNovaObavijest] = useState({
    id:"",
    naslov:"",
    datum: "",
    tekst: "",
    vazno: false
  });

  const saljiPodatke = async (event) => {
    event.preventDefault();
    if (!novaObavijest.naslov || !novaObavijest.datum || !novaObavijest.tekst) {
      alert("Molim ispuniti sva polja.");
      return;
    }

    try {
      await axios.post('http://localhost:3001/obavijesti', {
        id: "",
        naslov: novaObavijest.naslov,
        datum: novaObavijest.datum,
        tekst: novaObavijest.tekst,
        vazno: novaObavijest.vazno
      });
      alert('Obavijest sigurno spremljena');
    } catch (error) {
      console.error('Problem u spremanju obavijesti:', error);
      alert('Problem u spremanju obavijesti');
    }
  };
  function promjenaUlaza(event) {
    console.log(event.target);
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setNovaObavijest({ ...novaObavijest, [name]: value });
  }

  
  return (
    <form onSubmit={saljiPodatke}>
      <div>
        <label>
          Naslov:
          <input
            type="text"
            name="naslov"
            value={novaObavijest.naslov}
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
            value={novaObavijest.datum}
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
            value={novaObavijest.tekst}
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
            checked={novaObavijest.vazno}
            onChange={promjenaUlaza}
          />
        </label>
      </div>
      <button type="submit">Spremi</button>
    </form>
  );
}
export default UnosObavijesti;