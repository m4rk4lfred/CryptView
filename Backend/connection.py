from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import pooling
app = Flask(__name__)

db_pool = pooling.MySQLConnectionPool(
    pool_name="mypool",
    pool_size=5,         
    pool_reset_session=True,
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
    db_connection = db_pool.get_connection()  
    cursor = db_connection.cursor()
    checkEmail = "SELECT 1 FROM credentials WHERE email = %s"
    cursor.execute(checkEmail, (email,))
    authenticationEmail = cursor.fetchone()

    if not authenticationEmail:
     sql = "INSERT INTO credentials (username,email,password) VALUES (%s,%s,%s)"
     cursor.execute(sql,(username,email,password))
     db_connection.commit()
     return jsonify({ 'message': 'Successfully created an account', 'returnedValue': authenticationEmail, 'notificationType':'', 'notificationHeader':'Successfully created an account'})
    else:
     return jsonify({'message' : 'Account already exist', 'returnedValue': authenticationEmail, 'notificationType':'error','notificationHeader':'Registration failed'})
       

@app.route('/login', methods=['POST'])
def loginVerification():
  data = request.json
  entered_email = data['email']
  entered_password = data['user_password']
  db_pool_connection = db_pool.get_connection()
  cursor = db_pool_connection.cursor()
  
  cursor.execute('SELECT * FROM credentials WHERE email=%s',(entered_email,))
  email_check = cursor.fetchone()

  if not email_check:
     return jsonify({'message': 'Account dont exist'})
 
  stored_password = email_check[3]
  if entered_password == stored_password:
      return jsonify({'message': 'Login successful', 'notificationType':''
      ,'notificationHeader':'Successful'}), 200
  else:
      return jsonify({'message': 'Wrong password','notificationType':'error'
      ,'notificationHeader':'Failed'})


@app.route('/createWallet',methods=["POST"])
def createWallet():
   data = request.json
  
   

    

    

if __name__ == '__main__':
    app.run(debug=True)