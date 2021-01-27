import numpy as np
from flask_pymongo import PyMongo

from flask import Flask, jsonify, render_template
from pymongo import MongoClient 

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
# setup mongo connection

app.config["MONGO_URI"] = "mongodb://localhost:27017/rescue_angels_db"
mongo = PyMongo(app)

#################################################
# Flask Routes
#################################################

# Route to render most basic index.html template
@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")

# route for breeds page
@app.route("/breeds/")
@app.route("/breeds/<pet_type>")
def breeds(pet_type=None):

    if pet_type == "dogs":
        # remove Option ID from each row (Mongo DB's unique identifier)
        dog_breeds = list(mongo.db.dog_breeds.find({},{'_id': False}))
        
        #print(dog_breeds)
        return jsonify(dog_breeds)

    elif pet_type == "cats":
        # remove Option ID from each row (Mongo DB's unique identifier)
        cat_breeds = list(mongo.db.cat_breeds.find({},{'_id': False}))
        return jsonify(cat_breeds)
    else:
        return render_template("breeds.html")

# route to find a pet 
@app.route("/find-a-pet")
def find_a_pet():

    return render_template("find-a-pet.html")

# route to find organization s
@app.route("/organizations")
def organizations():

    return render_template("organizations.html")

# route to find a pet 
@app.route("/graphs")
def graphs():

    return render_template("graphs.html")

# Route that will return Web API JSON data from MongoDB
@app.route("/mongodb-web-api")
def mongodb_web_api():
    #client = MongoClient('localhost', 27017)
    client = MongoClient(localhost, 27017)

    db = client[rescue_angels_db]

    collection = db[org_new]

    results = collection.find()
    
    #results is a cursor object, when looping through it each result is a dictionary
    animals_by_location_db = [ {"name": result["name"], "id": result["id"], "Latitude": ["Latitude"], "Longitude": result["Longitude"], "address_address1": result["address_address1"]} for result in results]

    
    return jsonify(animals_by_location_db)

if __name__ == '__main__':
    app.run(debug=True)