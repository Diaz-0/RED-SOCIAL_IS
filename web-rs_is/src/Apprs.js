import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Rutas} from "./CONEXION/rutas"


export default function Apprs() {
  return (
   <BrowserRouter>
    <Rutas/>
   </BrowserRouter>
  )
}