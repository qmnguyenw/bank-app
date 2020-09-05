from flask import Flask, jsonify, request, json
from flask_pymongo  import PyMongo
from bson.objectid import ObjectId
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt
from flask_login import current_user, login_user, logout_user,LoginManager
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import User

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'bank_accounts'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/bank_accounts'
app.config['JWT_SECRET_KEY'] = 'secret'

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
login = LoginManager(app)
CORS(app)

@app.route('/users/register', methods=['POST'])
def register():
    users = mongo.db.users
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()

    user_id = users.insert({
	'first_name' : first_name, 
	'last_name' : last_name, 
	'email' : email, 
	'password' : password, 
	'created' : created, 
	})
    new_user = users.find_one({'_id' : user_id})

    result = {'email' : new_user['email'] + ' registered'}

    return jsonify({'result' : result})
	

@app.route('/users/login', methods=['POST'])
def login():
    users = mongo.db.users
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
	
    response = users.find_one({'email' : email})

    if response:	
        if bcrypt.check_password_hash(response['password'], password):
            access_token = create_access_token(identity = {
			    'first_name': response['first_name'],
				'last_name': response['last_name'],
				'email': response['email']}
				)
            # user = User(response)
            # login_user(user, remember={"email":response['email'], "password":response['password']})
            # print(current_user)
            result = jsonify({"token":access_token})
        else:
            result = jsonify({"error":"Invalid username and password"})            
    else:
        result = jsonify({"result":"No results found"})
    return result

@app.route('/api/accounts/<N>', methods=['GET'])
# @login_required
def get_all_accounts(N):
    N = int(N)
    accounts = mongo.db.accounts.find()
    total_number_pages = mongo.db.accounts.count()/50 +1 
    print("++++++++++++++++",total_number_pages)
    result = []
    for field in accounts[50*(N-1):50*N-1]:
        result.append({'_id': str(field['_id']), 'account_number': field['account_number'], 'balance': field['balance'],
        'firstname': field['firstname'], 'lastname': field['lastname'], 'age': field['age'], 'gender': field['gender'],
        'address': field['address'],'employer': field['employer'],'email': field['email'],'city': field['city'],
        'state': field['state'], })

    return jsonify({"total_number_pages":total_number_pages,"result":result})

@app.route('/api/account', methods=['POST'])
def add_account():
    accounts = mongo.db.accounts 
    _json = request.get_json()
    account_number = _json['account_number']
    balance = _json['balance']
    firstname = _json['firstname']
    lastname = _json['lastname']
    age = _json['age']
    gender = _json['gender']
    address = _json['address']
    employer = _json['employer']
    email = _json['email']
    city = _json['city']
    state = _json['state']
    account_id = accounts.insert({'account_number': account_number, 'balance':balance, 'firstname':firstname,
        'lastname':lastname, 'age':age, 'gender':gender, 'address':address, 'employer':employer,
        'email':email, 'city':city, 'state':state})
    new_account = accounts.find_one({'_id': account_id})

    result = {'account_number': new_account['account_number']} 
    return jsonify({'result': result})


@app.route('/api/account/<id>', methods=['PUT'])
def update_account(id):
    accounts = mongo.db.accounts 
    _json = request.get_json()
    account_number = _json['account_number']
    balance = _json['balance']
    firstname = _json['firstname']
    lastname = _json['lastname']
    age = _json['age']
    gender = _json['gender']
    address = _json['address']
    employer = _json['employer']
    email = _json['email']
    city = _json['city']
    state = _json['state']

    accounts.find_one_and_update({'_id': ObjectId(id)}, {'$set': {'account_number': account_number, 'balance':balance, 'firstname':firstname,
        'lastname':lastname, 'age':age, 'gender':gender, 'address':address, 'employer':employer,
        'email':email, 'city':city, 'state':state}}, upsert=False)

    new_account = accounts.find_one({'_id': ObjectId(id)})
    result = {'account_number': new_account['account_number']} 

    return jsonify({'result': result})

@app.route('/api/account/<id>', methods=['DELETE'])
def delete_task(id):
    accounts = mongo.db.accounts  

    response = accounts.delete_one({'_id': ObjectId(id)})

    if response.deleted_count == 1:
        result = {'message': 'record deleted'}
    else: 
        result = {'message': 'no record found'}
    
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)