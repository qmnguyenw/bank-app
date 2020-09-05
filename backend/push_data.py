from flask import Flask, jsonify, request
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
import json

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'bank_accounts'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/bank_accounts'
app.config['JWT_SECRET_KEY'] = 'secret'

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
login = LoginManager(app)
CORS(app)

accounts = mongo.db.accounts

with open('data/accounts.json') as json_file: 
    data = json.load(json_file) 
    temp = data['accounts'] 
for _json in temp:
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

    # new_account = accounts.find_one({'_id': account_id})
    # result = {'account_number': new_account['account_number']} 

    print(_json['account_number'])