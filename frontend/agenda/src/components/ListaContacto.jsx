import React, { useEffect, useState } from "react";
import { ModContacto } from './Mod_Contact'
import { FavContacts } from "./FavContacts";
import axios from 'axios'
import M from "materialize-css"
import { AddContact } from './AddContact'
import { EliminarContacto } from './EliminarContacto'
import '../styles/ListaContacto.css'

function ListaContato(fav) {
    const [listado, setListado] = useState([])
    const [loading, setLoading] = useState(false)
    const [filtro, setFiltro] = useState("")
    const [contador, setContador] = useState(0)

    useEffect(() => {
        getContacts()
    }, [])


    const getContacts = async () => {
        
        const res = await axios.get("http://localhost:5000/getContacts")
        if (res.data.res) {
            if(fav.fav.fav===2){
                let data = []
                res.data.data.forEach((da)=>{
                    if(da.favorito===1){
                        data.push(da)
                    }
                })
                setListado(data)
                setLoading(true)
                setContador(data.length)
            }else{
                setListado(res.data.data)
                setLoading(true)
                setContador(res.data.data.length)
            }
        } else {
            M.toast({
                html: "Ocurrio Un Error En El Servidor",
                classes: "rounded red darken-3 white-text",
            });
        }
    }




    const filtrarContactos = () => {
        return listado.filter((dato) => {
            return dato.nombre.toLowerCase().includes(filtro.toLowerCase())
        })
    }

    if (loading === true) {
        return (
            <div className="container">
                <div className="agregarContacto">
                    <AddContact actualizar={getContacts} />
                </div>
                <input
                    type="text"
                    placeholder="Buscar Contacto"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
                <div className="row">
                    <div className="col-md-8">

                        <div className="people-nearby">
                            {filtrarContactos().map((dato) => (
                                <div className="nearby-user" key={dato.id}>
                                    <div className="row">
                                        <div className="col-md-2 col-sm-2">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user" className="profile-photo-lg" style={{ heigth: "80px", width: "80px", borderRadius: "50%" }} />
                                        </div>
                                        <div className="col-md-7 col-sm-7 black-text">
                                            <h5><a href="#" className="profile-link">{dato.nombre + " " + dato.apellido}</a></h5>
                                            <p>Correo: {dato.correo}</p>
                                            <p className="text-muted">Telefono: {dato.telefono}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s1">
                                            <ModContacto id={dato.id} actualizar={getContacts} />
                                        </div>
                                        <div className="col s1">
                                            <FavContacts id={dato.id} favorito={dato.favorito} />
                                        </div>
                                        <div className="col s1">
                                            <EliminarContacto id={dato.id} data={dato.nombre+" "+dato.apellido} actualizar={getContacts}/>
                                        </div>
                                        <div className="col s1">
                                            <a href={"http://wa.me/502"+dato.telefono} className="btn-floating waves-effect waves-light green darken-2" target="_blank">
                                                <i className="material-icons">
                                                perm_phone_msg
                                                </i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (<div className="container"><h1 className="text-center">No hay datos</h1></div>);
    }

}

export default ListaContato;