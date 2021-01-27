import numpy as np
from flask_pymongo import PyMongo
import json

from flask import Flask, jsonify, render_template, Response


#################################################
# Database Setup
#################################################
# setup mongo connection
#conn = "mongodb://localhost:27017"
#client = pymongo.MongoClient(conn)




#################################################
# Flask Setup
#################################################
app = Flask(__name__)

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
        dog_breeds = list(mongo.db.dog_breeds.find({},{'_id': False}))
        #db_cursor = mongo.db.dog_breeds.find({},{'_id': False})
        # for breed in db_cursor:
        #     dog_breeds.append(breed)
        #dog_breeds = mongo.db.dog_breeds.find()

        #print(dog_breeds)
        return jsonify(dog_breeds)

    elif pet_type == "cats":
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

if __name__ == '__main__':
    app.run(debug=True)