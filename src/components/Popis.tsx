import React, {useState } from 'react';
import PrikazZivotinja from './PrikazZivotinja';
import FiltriranjeZivotinja from './FiltriranjeZivotinja';

function Popis(){
    
    return(
        <>
        <PrikazZivotinja></PrikazZivotinja>
        <FiltriranjeZivotinja></FiltriranjeZivotinja>
        </>
    )
}
export default Popis;