import requests
import mysql.connector
import json

# URL de la API
url = "https://openlibrary.org/search.json?q=all"  

response = requests.get(url)
if response.status_code == 200:
    api_data = response.json()
else:
    print("Error al obtener los datos de la API:", response.status_code)
    exit()

# 2. Conectar a la base de datos MySQL
conexion = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="librarydb"
)
cursor = conexion.cursor()

counter = 0

# 3. Procesar los datos y preparar las consultas SQL
for item in api_data["docs"]:
    counter += 1
    # 4. Insertar los datos en la base de datos
    query = "INSERT INTO books (idbooks, title, publish_date, pages, num_editions, contributors, placepublish, rating, quieren_leer, ya_leyendo, publishers, languages, autor_name, subjects) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    idbooks = counter
    title = item["title"]
    publish_date = item["first_publish_year"]
    pages = item["number_of_pages_median"]
    num_editions = item["edition_count"]
    try:
        contributors = item["contributor"]
    except Exception as e:
        contributors = ["None"]
    try:
        placepublish = item["publish_place"]
    except Exception as e:
        placepublish = ["None"]
    try:
        rating = item["ratings_average"]
    except Exception as e:
        rating = ["None"]
    quieren_leer = item["want_to_read_count"]
    ya_leyendo = item["currently_reading_count"]
    publishers = item["publisher"]
    languages = item["language"]
    autor_name = item["author_name"]
    autor_name = autor_name[0]
    try:
        subjects = item["subject"]
    except Exception as e:
        subjects = ["None"]
    contributors = json.dumps(contributors)
    subjects = json.dumps(subjects)
    placepublish = json.dumps(placepublish)
    publishers = json.dumps(publishers)
    languages = json.dumps(languages)
    valores = (idbooks, title, publish_date, pages, num_editions, contributors, placepublish, rating, quieren_leer, ya_leyendo, publishers, languages, autor_name, subjects)
    cursor.execute(query, valores)


# Confirmar los cambios y cerrar la conexión
conexion.commit()
conexion.close()

