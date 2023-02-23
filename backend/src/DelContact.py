import sqlite3


def delete_contact(request):
    # Obtener los datos del cuerpo de la petición en formato JSON
    data = request.get_json()

    # Obtener el identificador del contacto que se desea eliminar de los datos de la petición
    id_contact = data['id']

    # Establecer una respuesta por defecto
    res = True

    try:
        # Establecer una conexión con la base de datos
        connection = sqlite3.connect("db/agenda_db.db")

        # Crear un objeto cursor para interactuar con la base de datos
        cursor = connection.cursor()

        # Preparar la consulta SQL para eliminar el contacto con el identificador especificado
        query = "DELETE FROM contactos WHERE id = ?"
        param = (id_contact,)

        # Ejecutar la consulta SQL con el identificador del contacto como parámetro
        cursor.execute(query, param)
        
        if cursor.rowcount == 0:
            res = False

        # Confirmar los cambios en la base de datos
        connection.commit()

    except sqlite3.Error as error:
        # Si se produce un error al eliminar el registro, imprimir un mensaje de error
        print("Error al eliminar registro:", error)
        # Establecer la variable res en False
        res = False
        
    finally:
        # Cerrar la conexión a la base de datos
        if connection:
            connection.close()

        # Devolver una respuesta en formato JSON que indica si se ha eliminado el contacto correctamente o no
        return {"res": res}
