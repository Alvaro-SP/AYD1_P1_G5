import sqlite3

def add_contact(request):
    # Obtener el JSON enviado por el cliente
    data = request.get_json()
    contact = data['contact']

    # Capturar los datos del contacto
    name = contact['nombre']
    last_name = contact['apellido']
    phone = contact['telefono']
    email = contact['correo']

    # Establecer una respuesta por defecto
    res = False

    try:
        # Conectarse a la base de datos
        connection = sqlite3.connect("db/agenda_db.db")

        # Crear un cursor para ejecutar las consultas
        cursor = connection.cursor()

        # Insertar el nuevo contacto en la tabla de contactos
        cursor.execute(
            "INSERT INTO contactos (nombre, apellido, telefono, correo, favorito) VALUES (?, ?, ?, ?, ?)", (name, last_name, phone, email, False))

        # Actualizar la respuesta en función del número de registros afectados
        res = (cursor.rowcount == 1)

        # Confirmar los cambios en la base de datos
        connection.commit()
    except sqlite3.Error as error:
        # Imprimir un mensaje de error si se produce una excepción durante la operación
        print("Error al insertar registro:", error)
    finally:
        # Cerrar la conexión a la base de datos
        if connection:
            connection.close()

        # Devolver una respuesta al cliente en formato JSON
        return {"res": res}
