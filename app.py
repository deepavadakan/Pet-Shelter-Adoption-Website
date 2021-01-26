import numpy as np
import pymongo
import json

from flask import Flask, jsonify, render_template, Response


#################################################
# Database Setup
#################################################
# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.rescue_angels_db


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

# route for breeds page
@app.route("/breeds/")
@app.route("/breeds/<pet_type>")
def breeds(pet_type=None):

    if pet_type == "dogs":
        dog_breeds = list(db.dog_breeds.find())
        print(dog_breeds)
        #return jsonify(dog_breeds)
        return  Response(json.dumps(dog_breeds,default=str),mimetype="application/json")
    elif pet_type == "cats":
        cat_breeds = list(db.cat_breeds.find())
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

if __name__ == '__main__':
    app.run(debug=True)