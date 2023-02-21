import sqlite3


def get_contacts():
    # Inicializar la variable de respuesta y la lista de contactos
    res = False
    contacts = []

    try:
        # Conectar a la base de datos y obtener un cursor
        connection = sqlite3.connect("db/agenda_db.db")
        cursor = connection.cursor()

        # Ejecutar una consulta para obtener todos los registros de la tabla de contactos
        cursor.execute(
            "SELECT id, nombre, apellido, telefono, correo, favorito FROM contactos")
        data_db = cursor.fetchall()

        # Recorrer los registros obtenidos y agregarlos a la lista de contactos
        for row in data_db:
            contacts.append({
                'id': row[0],
                'nombre': row[1],
                'apellido': row[2],
                'telefono': row[3],
                'correo': row[4],
                'favorito': row[5]
            })

        # Establecer la variable de respuesta en True para indicar que la operación tuvo éxito
        res = True

    except Exception as e:
        # Si se produce un error, imprimir un mensaje de error
        print("Error al obtener registros:", e)

    finally:
        # Siempre cerrar la conexión a la base de datos
        if connection:
            connection.close()

        # Devolver un diccionario con la variable de respuesta y la lista de contactos
        return {
            "res": res,
            "data": contacts
        }
