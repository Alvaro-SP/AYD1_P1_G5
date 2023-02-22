import React from "react";
import { useState } from "react";
import '../styles/Contactos.css'

import { AddContact } from './AddContact'
import ListaContacto from './ListaContacto'
function Contactos() {

    return (
        <div className="contenedor-general">
            <h1>Contactos Guardados</h1>

            <ListaContacto/>
        </div>
    )
}

export default Contactos;