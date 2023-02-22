from flask import Flask, request, jsonify
from src.ModifyContact import edit_contacto, get_contacto
from src.AddContact import add_contact
from src.GetContacts import get_contacts

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

if __name__ == '__main__':
    app.run()
