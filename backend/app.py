from flask import Flask, request, jsonify
from src.ModifyContact import edit_contacto, get_contacto
from src.AddContact import add_contact
from src.GetContacts import get_contacts
from src.AddFavs import add_favs
from src.Listfavs import list_favs
from src.DelContact import delete_contact

from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
#! Endpoint para buscar un contacto por id

@app.route('/getContact', methods=['POST'])
def obtener_contacto():
    # Obtener el id del contacto a buscar desde el objeto JSON enviado con la solicitud HTTP
    id = request.json['id']
    # Buscar el contacto en la base de datos
    contacto = get_contacto(id)
    # Si se encontró el contacto, devolver un objeto JSON con la propiedad "Res" establecida en "true" y el contacto en la propiedad "Contact"
    if contacto:
        response = jsonify({'flag': True, 'contact': contacto})
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return (response)
    else:
        response = jsonify({'flag': False})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return (response)

#! Endpoint para editar un contacto
@app.route('/editContact', methods=['POST'])
def editar_contacto():
    contacto = request.json['contact']
    if not edit_contacto(contacto):
        response = jsonify({'res': False})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    response = jsonify({'res': True})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return (response)

#! Endpoint para agregar un contacto
@app.route('/addContact', methods=['POST'])
def agregar_contacto():
    resprev = add_contact(request)
    response = jsonify(resprev)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#! Endpoint para obtener todos los contactos
@app.route('/getContacts', methods=['GET'])
def obtener_contactos():
    resprev = get_contacts()
    response = jsonify(resprev)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#! Endpoint para cambiar contacto a favorito
@app.route('/addfavs', methods=['POST'])
def aniadir_favorito():
    # Obtener el id del contacto a buscar desde el objeto JSON enviado con la solicitud HTTP
    id = request.json['id']
    # Buscar el contacto en la base de datos
    contacto,bt = add_favs(id)
    # Si se encontró el contacto, devolver un objeto JSON con la propiedad "Res" establecida en "true" y el contacto en la propiedad "Contact"
    if contacto:
        if bt==1:
            bt=True
        else:
            bt=False
        response = jsonify({'flag': True, 'fav':bt})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return (response)
    else:
        response = jsonify({'flag': False})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return (response)

#! Endpoint para obtener todos los contactos FAVORITOS
@app.route('/listfavs', methods=['GET'])
def obtener_favoritos():
    resprev = list_favs()
    response = jsonify(resprev)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#! Endpoint para eliminar un contacto
@app.route('/deleteContact', methods=['POST'])
def elimnar_contacto():
    resprev = delete_contact(request)
    response = jsonify(resprev)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run()
