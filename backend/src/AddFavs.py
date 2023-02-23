import sqlite3
#! Función para setear a un contacto de la base de datos a Favoritos=1
def add_favs(id):
    favorito=False
    fav=0
    try:
        # Conexión a la base de datos
        conn = sqlite3.connect("../db/agenda_db.db")
        c = conn.cursor()
        # Update the "Favorito" attribute of the contact with the given ID to 1

        c.execute('''SELECT favorito FROM contactos WHERE id = ?''', (id,))
        favorito2 = c.fetchone()[0]
        if favorito2 == 1:
            c.execute('''UPDATE contactos SET favorito = ? WHERE id = ?''', (0, id,))
            fav=0
        else:
            c.execute('''UPDATE contactos SET favorito = ? WHERE id = ?''', (1, id,))
            fav=1
        favorito = True
        # Cerrar la conexión
        conn.commit()
        conn.close()
    except Exception as e:
        print("Error:", e)
    finally:
        # Siempre cerrar la conexión a la base de datos
        if conn:
            conn.close()
        return favorito,fav