import React, { useState } from 'react';
import Contactos from './Contactos';
import Logo from '../images/contactos.png'
import Email from './Email';

import {AddContact} from './AddContact'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import '../styles/Sidebar.css'


function Sidebar({ activo }) {
    const [clase1, setClase1] = useState('');
/*     const [clase2, setClase2] = useState('');*/
    const [clase3, setClase3] = useState(''); 
    const nombreClase = (num) => {
        switch (num) {
            case 1:
                setClase1('is-active');
                /* setClase2('');*/
                setClase3(''); 
                break;
/*             case 2:
                setClase1('');
                setClase2('is-active');
                setClase3('');
                break;*/
            case 3:
                setClase1('');
                //setClase2('');
                setClase3('is-active');
                break; 
            default:
                break;
        }
        return num;
    }


    return (
        <Router>
            <div className={activo ? 'sidebar is-active' : 'sidebar'}>
                <div className='logo-contenedor'>
                    <img src={Logo}
                        className="logo-app"
                        alt='Logo de app'
                    />
                    <div className='textoapp'>
                        <h4>Contacts Manager</h4>
                    </div>

                </div>
                <div className='div-menu'>
                    <h3>Menu</h3>
                </div>
                <nav className="menu">
                    <Link to="/" className={`menu-item ${clase1}`} onClick={() => nombreClase(1)}>Contactos</Link>
                    {/* <Link to="#" className={`menu-item ${clase2}`} onClick={() => nombreClase(2)}>Favoritos</Link> */}
                    <Link to="/email" className={`menu-item ${clase3}`} onClick={() => nombreClase(3)}>Enviar Email</Link>
                </nav>
            </div>
            <Routes>
                <Route path="/" element={<Contactos />} />
                {/* <Route path="/addcontact" element={<AddContact />} /> */}
                <Route path="/email" element={<Email />} />
            </Routes>
        </Router>
    );
}

export default Sidebar
