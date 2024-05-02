import { useState } from "react";
import axios from "axios";


function NovaDonacijaKorisnik({ dodajDonaciju }) {
  const [novaDonacija, setNovaDonacija] = useState({
    id:"",
    kategorija:"nudi",
    tip: "",
    vrijednost: "",
    opis: "",
  });

  const saljiPodatke = async (event) => {
    event.preventDefault();
    if (!novaDonacija.tip || !novaDonacija.vrijednost || !novaDonacija.opis) {
      alert("Molim ispuniti sva polja.");
      return;
    }

    try {
      await axios.post('http://localhost:3001/donacije', {
        id: "",
        kategorija: "nudi",
        tip: novaDonacija.tip,
        vrijednost: novaDonacija.vrijednost,
        opis: novaDonacija.opis
      });
      alert('Donacija sigurno spremljena');
    } catch (error) {
      console.error('Problem u spremanju donacije:', error);
      alert('Problem u spremanju donacije');
    }
  };

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

export default NovaDonacijaKorisnik;
