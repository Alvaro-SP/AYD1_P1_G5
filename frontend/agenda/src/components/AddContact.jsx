import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import M from "materialize-css";

export function AddContact({ id }) {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  const addContact = () => {
    // VALIDAR CAMPOS
    if (nombre !== "") {
      if (apellido !== "") {
        if (correo !== "") {
          if (telefono !== "" && telefono.length > 0 && telefono.length < 9) {
            axios
              .post(
                "http://localhost:5000/editContact",
                JSON.stringify({
                  id: id,
                  nombre: nombre,
                  apellido: apellido,
                  telefono: telefono,
                  correo: correo,
                })
              )
              .then((resp) => {
                if (resp.flag) {
                  M.toast({
                    html: "El Contacto Ha Sido Actualizado",
                    classes: "rounded green darken-3 white-text",
                  });
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
        href="#contentModal"
        className="waves-effect waves-light btn indigo darken-2 modal-trigger"
      >
        <i className="material-icons left">edit</i>
        Agregar Contacto
      </a>

      <div className="modal modal-fixed-footer" id="contentModal">
        <div className="modal-content">
          <h4 className="black-text">Agregar Contacto</h4>
          <div className="divider"></div>
          <div className="container" style={{ paddingTop: "8%" }}>
            <div className="row">
              <div className="input-field col s6">
                <input
                  type="text"
                  id="nombre"
                  className="validate"
                  onChange={(e) => updateData(e.target.value, "nombre")}
                  value={nombre}
                />
                <label htmlFor="nombre">Nombre</label>
              </div>
              <div className="input-field col s6">
                <input
                  type="email"
                  id="apellido"
                  className="validate"
                  onChange={(e) => updateData(e.target.value, "apellido")}
                  value= {apellido}
                />
                <label htmlFor="apellido">Apellido</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  type="text"
                  id="telefono"
                  className="validate"
                  onChange={(e) => updateData(e.target.value, "telefono")}
                  value={telefono}
                />
                <label htmlFor="telefono">Telefono</label>
              </div>
              <div className="input-field col s6">
                <input
                  type="text"
                  id="correo"
                  className="validate"
                  onChange={(e) => updateData(e.target.value, "correo")}
                  value={correo}
                />
                <label htmlFor="correo">Correo</label>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat col s2"
            onClick={() => addContact()}
          >
            <i className="material-icons left">save_as</i>
            Guardar
          </a>
          <a
            href="#!"
            className="modal-close waves-effect waves-red btn-flat col s2"
          >
            <i className="material-icons left">cancel</i>
            Cancelar
          </a>
        </div>
      </div>
    </>
  );
}
