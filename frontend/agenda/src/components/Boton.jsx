import React from "react";
import '../styles/Boton.css'

function Boton({ activo, metodo }) {
    
    return (
        <div className={activo ? 'menu-toggle is-active' : 'menu-toggle'} onClick={metodo}>
            <div className='hamburger'>
                <span>
                </span>
            </div>
        </div>
    );
}

export default Boton;