import React, { useEffect, useState } from "react";
import axios from "axios";

function PrikazZivotinja(props) {
  const [zivotinje, postaviZivotinje] = useState([]);
 
  useEffect(() => {
    axios
      .get("http://localhost:3001/zivotinje")
      .then((response) => postaviZivotinje(response.data))
      .catch((error) => console.log(error));
  }, []);
 
  return (
    <>
      <h2>Popis životinja u azilu</h2>
      <div className="kartice">
        {zivotinje.map((zivotinja) => (
          <div key={zivotinja.id} className="kartica">
            <img src={zivotinja.slika} alt={zivotinja.ime} height={250} width={320} />
            <h3>{zivotinja.ime}</h3>
            <p>Vrsta: {zivotinja.vrsta}</p>
            <p>Starost: {zivotinja.starost}</p>
            <p>Rasa: {zivotinja.rasa}</p>
            <p>Status: {zivotinja.udomljen ? "Udomljena" : "Nije udomljena"}</p>
            <p>Čipiran: {zivotinja.cip ? "Da": "Ne"}</p>
            <p>Datum zadnjeg pregleda: {zivotinja.zadnjiPregled}</p>
            <p>Napomena: {zivotinja.napomena}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default PrikazZivotinja;
