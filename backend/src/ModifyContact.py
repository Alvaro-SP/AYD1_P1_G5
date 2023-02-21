import sqlite3

# Función para obtener un contacto de la base de datos
def get_contacto(id):
    # Conexión a la base de datos
    # conn = sqlite3.connect('D:/New folder/OneDrive - Facultad de Ingeniería de la Universidad de San Carlos de Guatemala/7 SEMESTRE/4AYD1/LAB DE AYD1/BASE DE DATOS P1 TEMPORAL/agenda_db.db')
    conn = sqlite3.connect('db/agenda_db.db')
    c = conn.cursor()

    # Buscar el contacto por id en la base de datos
    c.execute('''SELECT * FROM contactos WHERE id=?''', (id,))
    contacto = c.fetchone()

    # Cerrar la conexión
    conn.close()

    # Si se encontró el contacto, devolver un diccionario con sus datos
    if contacto:
        return {'id': contacto[0], 'nombre': contacto[1], 'apellido': contacto[2], 'telefono': contacto[3], 'correo': contacto[4], 'favorito': bool(contacto[5])}
    else:
        return None

def edit_contacto(contacto):
    try:
        # Conexión a la base de datos
        # conn = sqlite3.connect('D:/New folder/OneDrive - Facultad de Ingeniería de la Universidad de San Carlos de Guatemala/7 SEMESTRE/4AYD1/LAB DE AYD1/BASE DE DATOS P1 TEMPORAL/agenda_db.db')
        conn = sqlite3.connect('db/agenda_db.db')
        c = conn.cursor()

        # Actualizar el contacto en la base de datos
        c.execute('''UPDATE contactos SET nombre=?, apellido=?, telefono=?, correo=?, favorito=? WHERE id=?''',
                  (contacto['nombre'], contacto['apellido'], contacto['telefono'], contacto['correo'], contacto['favorito'], contacto['id']))

        # Guardar los cambios y cerrar la conexión
        conn.commit()
        conn.close()

        return True
    except:
        return False

# ENDPOINT EN APP.PY:


# @app.route('/editContact', methods=['POST'])
# def editar_contacto():
#     contacto = request.json['Contact']
#     if not edit_contacto(contacto):
#         return jsonify({'Res': False})
#     return jsonify({'Res': True})
