from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import pooling
import jwt
app = Flask(__name__)

SECRET_KEY  = 'cryptview'
db_pool = pooling.MySQLConnectionPool(
    pool_name="mypool",
    pool_size=5,         
    pool_reset_session=True,
    host="localhost",
    user="root",
    password="",
    database="cryptview"
)



def createToken(user_id):
    payload = {  'user_id' : user_id}
    token = jwt.encode(payload ,SECRET_KEY , 'HS256' )
    return token

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
  cursor = db_pool_connection.cursor(dictionary=True)
  
  cursor.execute('SELECT * FROM credentials WHERE email=%s',(entered_email,))
  email_check = cursor.fetchone()
  
  db_pool_connection.close()
  cursor.close()
  if not email_check:
     return jsonify({'message': 'Account dont exist'})
  

  stored_password = email_check['password']
  if entered_password == stored_password:
      token = createToken(email_check['user_id'])
      return jsonify({'message': 'Login successful', 'notificationType':''
      ,'notificationHeader':'Successful','token':token ,}), 200
  else:
      return jsonify({'message': 'Wrong password','notificationType':'error'
      ,'notificationHeader':'Failed'}),401
  



@app.route('/createWallet',methods=["POST"])
def createWallet():
   try: 
    data = request.json
    wallet_Name = data['walletName']
    wallet_Balance = data['walletBalance']
    token = data['token']
    decoded_token = jwt.decode(token,SECRET_KEY,algorithms=['HS256'])
    user_id = decoded_token['user_id']
    db_pool_connection = db_pool.get_connection()
    cursor = db_pool_connection.cursor()
    sql = "INSERT INTO wallet(wallet_name,balance,user_id) VALUES(%s,%s,%s)"  
    cursor.execute(sql,(wallet_Name,wallet_Balance,user_id))
    db_pool_connection.commit()
    cursor.close()
    db_pool_connection.close()
    return jsonify({'message':'Successfully added'}),201
   except Exception as e:
      return jsonify({'message':'Failed to return '}),401

@app.route('/getWallet',methods=['POST'])
def getWallet():
   try:
     data  =  request.json
     user_token = data['token']
     decoded_token = jwt.decode(user_token,SECRET_KEY,algorithms=['HS256'])
     user_id = decoded_token['user_id']
     db_pool_connection = db_pool.get_connection()
     cursor = db_pool_connection.cursor(dictionary=True)
     sql = 'SELECT * FROM wallet WHERE user_id=%s'
     cursor.execute(sql,(user_id, ))
     wallets = cursor.fetchall()
    
     
     cursor.close()
     db_pool_connection.close()

     return jsonify({'wallet': wallets}),200
   except Exception as e:
    return jsonify({'message':'Failed to return '}),401


@app.route('/addTransaction',methods=['POST'])
def handleTransaction():
   try:
    data = request.json
    wallet_id = data['walletId']
    crypto_name = data['cryptoName']
    crypto_symbol = data['cryptoSymbol']
    crypto_logo = data['cryptoLogo']
    transaction_type = data['transactionType']
    quantity = data['quantity']
    pricePerCoin = data['pricePerCoin']
    transaction_date = data['transactionDate']
 
    db_pool_connection = db_pool.get_connection()
    cursor = db_pool_connection.cursor(dictionary=True)
    cursor.execute('INSERT INTO transactions(wallet_id,crypto_name,crypto_symbol,crypto_logo,transaction_type,quantity,price_per_coin,transaction_date) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)',(wallet_id,crypto_name,crypto_symbol,crypto_logo,transaction_type,quantity,pricePerCoin,transaction_date))
 
    db_pool_connection.commit()
    db_pool_connection.close()
    cursor.close()
    
    return jsonify({'message':'Successfully added'}),201
   except Exception as e:
    return jsonify({'message':'failed to add'})

@app.route('/fetchTransaction', methods=['POST'])
def fetchTransaction():
   try:
     data = request.json
     db_pool_connection = db_pool.get_connection()
     cursor = db_pool_connection.cursor(dictionary=True) 
     selected_wallet = data['walletId']
     cursor.execute('SELECT * from transactions WHERE wallet_id=%s', (selected_wallet, ))
     fetchedData = cursor.fetchall()
   
     db_pool_connection.close()
     cursor.close()
     return jsonify({'transactionData' : fetchedData }),201

   except Exception as e:
     return jsonify({'data' : e}),401

@app.route('/deleteTransaction',methods=['POST'])
def deleteTransaction():
   try:
      data = request.json
      transactionId = data['transaction_id']
      db_pool_connection = db_pool.get_connection()
      cursor = db_pool_connection.cursor(dictionary=True)
      query2 = db_pool_connection.cursor(dictionary=True)
      query2.execute('SELECT * FROM transactions WHERE transaction_id=%s',(transactionId ,))
      data_to_delete  = query2.fetchone()
      addHistory(data_to_delete)
      cursor.execute('DELETE FROM transactions WHERE transaction_id=%s',(transactionId ,))
      db_pool_connection.commit()  
      cursor.close()  
      db_pool_connection.close() 
      return jsonify({'message':'Successfully deleted'})
   except Exception as e:  
      return jsonify({'message':e})

def addHistory(data):
  try:
    db_pool_connection = db_pool.get_connection()
    cursor = db_pool_connection.cursor(dictionary=True)
    addQuery = 'INSERT INTO transaction_history(wallet_id ,crypto_name,crypto_symbol,crypto_logo,transaction_type,quantity,price_per_coin,total_value,transaction_date,created_at) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
    cursor.execute(addQuery, (data['wallet_id'], data['crypto_name'] , data['crypto_symbol'] , data['crypto_logo'] , data['transaction_type'] , data['quantity'] , data['price_per_coin'], data['total_value'], data['transaction_date'], data['created_at'], ))
    
    db_pool_connection.commit()
    db_pool_connection.close()
    cursor.close()

    return jsonify({'message':'added to the history'}), 201
  except Exception as e:
     return jsonify({'message':'failed to add to history'}), 401

@app.route('/getTransactionHistory',methods=['POST'])
def transactionHistory():
   try:
    data = request.json
    walletId = data['wallet_id']
    db_pool_connection = db_pool.get_connection()
    cursor = db_pool_connection.cursor(dictionary=True)
    sql = 'SELECT * FROM transaction_history WHERE wallet_id=%s'
    cursor.execute(sql , (walletId, ))
    
    transaction_history = cursor.fetchall()
 
 
    cursor.close()
    db_pool_connection.close()
    print(transaction_history)
    return jsonify({'fetched_history' : transaction_history})
   except Exception as e:
    return jsonify({'message' : e})

@app.route('/addFavorite', methods=['POST'])
def addFavorite():
  try:
   data = request.json
   walletId = data['wallet_id']
   cryptoName = data['crypto_name']
   cryptoSymbol = data['crypto_symbol']
   crpytoLogo = data['crypto_logo']
   perCoin = data['price_per_coin']
   totalValue = data['total_value']
 
   db_pool_connection = db_pool.get_connection()
   cursor = db_pool_connection.cursor(dictionary=True)
 
   cursor.execute('INSERT INTO favorite_crypto(wallet_id,crypto_name,crypto_symbol,crypto_logo,price_per_coin,total_value) VALUES(%s,%s,%s,%s,%s,%s)', (walletId, cryptoName
                                                                                                                                                        ,cryptoSymbol,crpytoLogo,perCoin,totalValue, ))
   db_pool_connection.commit()
   db_pool_connection.close()
   cursor.close()
 
   return jsonify({'message':'Successfully Added Favorited'}),201
  except Exception as e:
    return jsonify({'message':e}),401

@app.route('/fetchFavorites', methods=['POST'])
def fetchFavorites():
  try:
   data = request.json
   wallet = data['selected_wallet']
   db_pool_connection = db_pool.get_connection()
   cursor = db_pool_connection.cursor(dictionary=True)
 
   fetch_favorite = 'SELECT * FROM favorite_crypto WHERE wallet_id=%s'
   cursor.execute(fetch_favorite, (wallet, ))
   favorite_item = cursor.fetchall()
   db_pool_connection.commit()
   
   return jsonify({'message':'Successfully fetched the favorited items'})

   cursor.close()
   db_pool_connection.close()
   
  except Exception as e:
    return jsonify({'message':'Failed to fetch the favorited items'})
if __name__ == '__main__':
    app.run(debug=True)