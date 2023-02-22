import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import M from "materialize-css";

export function ModContacto({ id ,actualizar}) {
  
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [favorito, setFavorito] = useState("");

  const idModal = "#contentModal" + id
  const triggerModal = "contentModal" + id

  useEffect(() => {
    M.AutoInit();
  }, []);
  
  const getContact = () => {
    axios
      .post("http://localhost:5000/getContact", { 'id': id })
      .then((data) => {
        if (data.data.flag) {
          setNombre(data.data.contact.nombre);
          setApellido(data.data.contact.apellido);
          setCorreo(data.data.contact.correo);
          setTelefono(data.data.contact.telefono);
          setFavorito(data.data.contact.favorito);
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
      });
  };

  const sendContact = () => {
    // VALIDAR CAMPOS
    if (nombre !== "") {
      if (apellido !== "") {
        if (correo !== "") {
          if (telefono !== "" && telefono.length === 8) {
            const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (regex_email.test(correo)){
              axios
                .post(
                  "http://localhost:5000/editContact",
                  {
                    'contact': {
                      'id': id,
                      'nombre': nombre,
                      'apellido': apellido,
                      'telefono': parseInt(telefono),
                      'correo': correo,
                      'favorito': favorito
                    }
                  }
                ) 
                .then((resp) => {
                  if (resp.data.res) {
                    M.toast({
                      html: "El Contacto Ha Sido Actualizado",
                      classes: "rounded green darken-3 white-text",
                    });
                    actualizar.actualizar();
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
                });
            } else {
              M.toast({
                html: "El correo electrónico no es válido.",
                classes: "rounded orange darken-3 white-text",
              });
            }
          } else {
            M.toast({
              html: "El Numero De Telefono Ingresado Es Incorrecto",
              classes: "rounded orange darken-3 white-text",
            });
          }
        } else {
          M.toast({
            html: "El Correo Electronico Ingresado Es Incorrecto",
            classes: "rounded orange darken-3 white-text",
          });
        }
      }
    }
  };

  const updateData = (valor, campo) => {
    switch (campo) {
      case "nombre":
        setNombre(valor);
        break;

      case "apellido":
        setApellido(valor);
        break;

      case "telefono":
        setTelefono(valor);
        break;

      case "correo":
        setCorreo(valor);
        break;
    }
  };

  return (
    <>
      <a
        href={idModal}
        className="waves-effect waves-light btn-floating indigo darken-2 modal-trigger"
        onClick={() => getContact()}
      >
        <i className="material-icons left">edit</i>
      </a>

      <div className="modal modal-fixed-footer" id={triggerModal}>
        <div className="modal-content">
          <h4 className="black-text">Modificar Contacto</h4>
          <div className="divider"></div>
          <div className="container" style={{ paddingTop: "8%" }}>
          <div className="row">
              <div className="input-field col s6">
                <input
                  type="text"
                  id="nombre"
                  className="validate"
                  onChange={(e) => updateData(e.target.value, "nombre")}
                  defaultValue={nombre}
                />
                <label htmlFor="nombre" className="active">Nombre</label>
              </div>
              <div className="input-field col s6">
                <input
                  type="text"
                  id="apellido"
                  className="validate"
                  onChange={(e) => updateData(e.target.value, "apellido")}
                  defaultValue={apellido}
                />
                <label htmlFor="apellido" className="active">Apellido</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  type="text"
                  id="telefono"
                  className="validate"
                  onChange={(e) => updateData(e.target.value, "telefono")}
                  defaultValue={telefono}
                />
                <label htmlFor="telefono" className="active">Telefono</label>
              </div>
              <div className="input-field col s6">
                <input
                  type="email"
                  id="correo"
                  className="validate"
                  onChange={(e) => updateData(e.target.value, "correo")}
                  defaultValue={correo}
                />
                <label htmlFor="correo" className="active">Correo</label>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat col s2"
            onClick={() => sendContact()}
          >
            <i className="material-icons">save_as</i>
            Guardar
          </a>
          <a
            href="#!"
            className="modal-close waves-effect waves-red btn-flat col s2"
          >
            <i className="material-icons">cancel</i>
            Cancelar
          </a>
        </div>
      </div>
    </>
  );
}
