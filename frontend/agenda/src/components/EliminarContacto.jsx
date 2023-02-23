import axios from "axios";
import M from "materialize-css";

export function EliminarContacto({ id, data, prop }) {
  const eliminar = () => {
    console.log(id);
    axios
      .post("http://localhost:5000/deleteContact", { id: id })
      .then((data) => {
        if (data.data.res) {
          M.toast({
            html: "Se elimino el contacto",
            classes: "rounded red darken-3 white-text",
          });
          prop.actualizar();
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
          classes: "rounded red darken-3 white-text",
        });
      });
  };

  const modalid = "modalEliminar" + id
  const modalidRef = "#modalEliminar" + id

  return (
    <>
      
      <a
        className="waves-effect waves-light red btn-floating modal-trigger"
        href={modalidRef}
      >
        <i className="material-icons">disabled_by_default</i>
      </a>

            <div id={modalid} class="modal">
                <div className="modal-content">
                    <h4 className="black-text">Eliminar</h4>
                    <p className="black-text">Desea eliminar el contacto {data}</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-red btn-flat" onClick={eliminar}>AGREE</a>
                </div>
            </div>
      
    </>
  );
}
