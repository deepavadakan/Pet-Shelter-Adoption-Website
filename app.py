import numpy as np

from flask import Flask, jsonify, render_template
from pymongo import MongoClient 


#################################################
# Database Setup
#################################################


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

# Route to render most basic index.html template
@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")

# route to find pet breeds
@app.route("/breeds")
def breeds():

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
    client = MongoClient(localhost27017)

    db = client[rescue_angels_db]

    collection = db[org_collection]

    results = collection.find()
    
    #results is a cursor object, when looping through it each result is a dictionary
    animals_by_location_db = [ {"name": result["name"], "id": result["id"], "address_address1": result["address_address1"]} for result in results]

    
    return jsonify(animals_by_location_db)

if __name__ == '__main__':
    app.run(debug=True)