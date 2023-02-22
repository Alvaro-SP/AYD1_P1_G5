import axios from "axios";
import M from "materialize-css";

export function EliminarContacto({ id, dato ,actualizar}) {

    const eliminar = () => {
        axios
            .post("http://localhost:5000/deleteContact", { 'id': id })
            .then((data) => {
                if (data.data.res) {
                    M.toast({
                        html: "Se elimino el contacto",
                        classes: "rounded red darken-3 white-text",
                    });
                    actualizar.actualizar();
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
            <a class="waves-effect waves-red btn modal-trigger" href="#modaleliminar">
                <i className="material-icons">disabled_by_default</i>
            </a>

            <div id="modaleliminar" class="modal">
                <div class="modal-content">
                    <h4>Eliminar</h4>
                    <p>Desea eliminar el contacto {dato.nombre+" "+dato.apellido}</p>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-red btn-flat" onClick={eliminar}>AGREE</a>
                </div>
            </div>
        </>
    );
}