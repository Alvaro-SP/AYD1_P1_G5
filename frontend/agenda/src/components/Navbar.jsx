import React from "react";
import { useState } from "react";
import Boton from "./Boton";
import Sidebar from "./Sidebar";

function Barra() {
    const [activo, setActivo] = useState(false)
    const toggleClass = () => {
        setActivo(!activo)
    }
    return (
        <>
            <Boton metodo={toggleClass} activo={activo} />
            <Sidebar activo={activo} />
        </>
    );
}

export default Barra;