import React, { useState } from "react";
import PrikazZivotinja from "./PrikazZivotinja";

function FiltriranjeZivotinja(props) {
  const [filterVrsta, postaviFilterVrsta] = useState("");
  const [filterStatus, postaviFilterStatus] = useState("");

  const promijeniFilterVrsta = (event) => {
    postaviFilterVrsta(event.target.value);
  };

  const promijeniFilterStatus = (event) => {
    postaviFilterStatus(event.target.value);
  };

  const filtrirajZivotinje = (zivotinje) => {
    let filtriraneZivotinje = zivotinje ?? [];

    if (filterVrsta !== "") {
      filtriraneZivotinje = filtriraneZivotinje.filter(
        (zivotinja) => zivotinja.vrsta.toLowerCase() === filterVrsta.toLowerCase()
      );
    }

    if (filterStatus !== "") {
      const udomljene = filterStatus === "udomljene";

      filtriraneZivotinje = filtriraneZivotinje.filter(
        (zivotinja) => zivotinja.udomljen === udomljene
      );
    }

    return filtriraneZivotinje;
  };

  return (
    <>
      <h2>Filtriranje životinja</h2>
      <div className="filtriranje">
        <div className="filtriranje-vrsta">
          <label htmlFor="vrsta">Vrsta:</label>
          <input type="text" id="vrsta" value={filterVrsta} onChange={promijeniFilterVrsta} />
        </div>
        <div className="filtriranje-status">
          <label htmlFor="status">Status:</label>
          <select id="status" value={filterStatus} onChange={promijeniFilterStatus}>
            <option value="">Sve</option>
            <option value="udomljene">Udomljene</option>
            <option value="neudomljene">Neudomljene</option>
          </select>
        </div>
      </div>
      <PrikazZivotinja zivotinje={filtrirajZivotinje(props.zivotinje)} />
    </>
  );
}

export default FiltriranjeZivotinja;

