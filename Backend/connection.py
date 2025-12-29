from flask import Flask, request
from flask_cors import CORS
import mysql.connector
app = Flask(__name__)

db_connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="cryptview"
)



@app.route('/')
def helloWorld():
    return '<p>Hello world</p>'

CORS(app)



@app.route('/register', methods=['POST'])
def handle_registration():
    data = request.json
    username = data['username']
    email = data['email']
    password = data['userPassword']

    cursor = db_connection.cursor()
    
    sql = "INSERT INTO credentials (username,email,user_passkey) VALUES (%s,%s,%s)"
    cursor.execute(sql,(username,email,password))

    db_connection.commit()
    return {'message': 'Successfully created an account'}

    

    

if __name__ == '__main__':
    app.run(debug=True)