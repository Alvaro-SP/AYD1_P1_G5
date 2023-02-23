import sqlite3

# Función para obtener un contacto de la base de datos
def get_contacto(id):
    # Conexión a la base de datos
    conn = sqlite3.connect("../db/agenda_db.db")
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
    bandera = False
    try:
        # Conexión a la base de datos
        conn = sqlite3.connect("../db/agenda_db.db")
        c = conn.cursor()

        # Actualizar el contacto en la base de datos
        c.execute('''UPDATE contactos SET nombre=?, apellido=?, telefono=?, correo=?, favorito=? WHERE id=?''',
                  (contacto['nombre'], contacto['apellido'], (contacto['telefono']), contacto['correo'], contacto['favorito'], contacto['id']))
        print((contacto['telefono']))
        # Guardar los cambios y cerrar la conexión
        conn.commit()
        conn.close()

        bandera = True
    except Exception as e:
        print("Error:", e)
    finally:
        # Siempre cerrar la conexión a la base de datos
        if conn:
            conn.close()

        return bandera


# ENDPOINT EN APP.PY:


# @app.route('/editContact', methods=['POST'])
# def editar_contacto():
#     contacto = request.json['Contact']
#     if not edit_contacto(contacto):
#         return jsonify({'Res': False})
#     return jsonify({'Res': True})
