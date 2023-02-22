import React, { useState } from "react";
import axios from "axios";
import M from "materialize-css";

export function FavContacts({ id, favorito }) {
  const [iconButton, setIcon] = useState("");
  if (favorito === 1) {
    setIcon("star");
  } else {
    setIcon("star_border");
  }

  const changeFav = () => {
    axios
      .post("http://localhost:5000/addfavs", { 'id': id })
      .then((data) => {
        if (data.data.flag) {
          if (data.data.fav) {
            setIcon("star");
          } else {
            setIcon("star_border");
          }
        } else {
          M.toast({
            html: "Ocurrio Un Error En El Servidor",
            classes: "rounded red darken-3 white-text",
          });
        }
      })
      .catch(() => {
        M.toas({
          html: "Ocurrio Un Error En La Peticion",
          class: "rounded red darken-3 white-text",
        });
      });
  };

  return (
    <>
      <a className="btn-floating btn-flat waves-effect waves-yellow" onClick={changeFav}>
        <i className="material-icons">{iconButton}</i>
      </a>
    </>
  );
}
