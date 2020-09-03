from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS 

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'bank_accounts'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/bank_accounts'

mongo = PyMongo(app)
CORS(app)

@app.route('/api/accounts', methods=['GET'])
def get_all_tasks():
    accounts = mongo.db.accounts 
    result = []
    for field in accounts.find():
        result.append({'_id': str(field['_id']), 'account_number': field['account_number'], 'balance': field['balance'],
        'firstname': field['firstname'], 'lastname': field['lastname'], 'age': field['age'], 'gender': field['gender'],
        'address': field['address'],'employer': field['employer'],'email': field['email'],'city': field['city'],
        'state': field['state'], })
    return jsonify(result)

@app.route('/api/account', methods=['POST'])
def add_task():
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
def update_task(id):
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