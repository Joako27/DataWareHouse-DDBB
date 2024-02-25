import mysql.connector
from mysql.connector import errorcode
import json
import os
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
@app.route('/search', methods=['POST'])
@cross_origin()
def mi_evento():
    '''Search in the database the all the books in the DB.'''
    data_list = []
    dirname = os.path.dirname(__file__)
    filename = os.path.join(dirname, 'database_config.json')
    val = request.get_json()  
    with open(filename, 'r') as f:
        connection = mysql.connector.connect(user='root', password='root', host='localhost', port="3306", database='librarydb')
        cursor = connection.cursor()
        query = ("SELECT * FROM books WHERE idbooks LIKE '%" + val["val"] + "%' OR title LIKE '%" + val["val"] + "%' OR autor_name LIKE '%" + val["val"] + "%'")

        cursor.execute(query)
        #Generating Json
        for (idbooks, title, publish_date, pages, num_editions, contributors, placepublish, rating, quieren_leer, ya_leyendo, publishers, languages, autor_name, subjects) in cursor:
            id = idbooks
            ti = title
            pu = publish_date
            pa = pages
            num = num_editions
            con = contributors
            pl = placepublish
            ra = rating
            qu = quieren_leer
            ya = ya_leyendo
            pub = publishers
            lan = languages
            au = autor_name
            sub = subjects
            data = {
                'IdBook': id,
                'Title': ti,
                'PublishDate': pu,
                "Pages": pa,
                "NumEditions": num,
                "Contributors": con,
                "PlacePublished": pl,
                "Rating": ra,
                "QuierenLeer": qu,
                "YaLeyendo": ya,
                "Publishers": pub,
                "Languages": lan,
                "AuthorName": au,
                "Subjects": sub
            }
            data_list.append(data)
        cursor.close()
    response = jsonify(data_list)
    return response

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
