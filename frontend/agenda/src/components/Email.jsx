import React from "react";
import '../styles/Email.css'
import { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import M from "materialize-css";
import axios from 'axios'
import { useEffect } from "react";
/*componente para enviar email*/


function Email() {
    const [email, setEmail] = useState('');
    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [listado, setListado] = useState([])
    const [loading, setLoading] = useState(false)

    const form = useRef();


    const enviarEmail = (e) => {
        if (email === '' || asunto === '' || mensaje === '') {
            M.toast({
                html: "Por favor llene todos los campos",
                classes: "rounded red darken-3 white-text",
              });
            return;
        }
        else {
            e.preventDefault();
            console.log('enviando email');
            console.log(email);
            console.log(asunto);
            console.log(mensaje);

            emailjs.send('service_qoflz61', 'template_o5r934h', {
                email: email,
                asunto: asunto,
                mensaje: mensaje
            }, 'x0Q07oogmXRaAlig1')
                .then((result) => {
                    M.toast({
                        html: "Mensaje Enviado",
                        classes: "rounded green darken-3 white-text",
                        //centrar
                        displayLength: 2000,
                        inDuration: 500,
                        outDuration: 500,

                      });
                }, (error) => {
                    console.log(error.text);
                });
        }
    };

    useEffect(() => {
        axios
        .get("http://localhost:5000/getContacts")
        .then((values) => {
            if (values.data.res) {
                setListado(values.data.data)
                setLoading(true)
            } else {
                M.toast({
                    html: "Ocurrio Un Error En El Servidor",
                    classes: "rounded red darken-3 white-text",
                });
            }
        })
        .catch((err) => {
            M.toast({
                html: "Ocurrio Un Error Al Realizar La Peticion",
                classes: "rounded red darken-3 white-text",
              });
        })
    }, [])


    return (
        <div className="contenedor-form">
            <div className="contorno">
                <form ref={form} onSubmit={enviarEmail} className="browser-default validate">
                    <label className="mi-label">
                        Selecciona contacto
                    </label>
                    {/*<select className="browser-default validate" name="email" value={email} onChange={e => setEmail(e.target.value)}>
                        <option >javskrow.jc.tloz@gmail.com</option>
                        <option >2181781580101@ingenieria.usac.edu.gt</option>
                        <option >Correo 3</option>
    </select>*/}
                    <select className="browser-default validate" name="email" value={email} onChange={e => setEmail(e.target.value)}>
                        {loading ? listado.map((item) => {
                            return (
                                <option value={item.correo}>Nombre: {item.nombre} Email: {item.correo}</option>
                            )
                        }) : <option value="Cargando...">Cargando...</option>}
                    </select>
                    <label className="mi-label">
                        Asunto
                    </label>
                    <input className="mi-inpu" type="text" name="asunto" value={asunto} onChange={(e) => setAsunto(e.target.value)} />
                    <label className="mi-label">
                        Mensaje
                    </label>
                    <textarea className="mi-textarea" name="mensaje" value={mensaje} onChange={
                        (e) => setMensaje(e.target.value)} />
                    {/*<input type="submit" value="Enviar" className="mi-boton" />*/}
                    <div className="mi-boton">
                    <button class="btn-large waves-effect waves-light orange" type="submit" name="action">Enviar Correo
                        <i class="material-icons right">send</i>
                    </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Email;