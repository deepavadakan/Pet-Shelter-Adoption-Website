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
        dog_breeds = list(mongo.db.dog_breeds.find())[0]
        print(dog_breeds)
        return jsonify(dog_breeds)
        #print(json.dumps(dog_breeds,default=str))
        #return  jsonify(json.dumps(dog_breeds,default=str))
        #return  Response(json.dumps(dog_breeds,default=str),mimetype="application/json")
        
        # results = []
        # for row in dog_breeds:
        #     results.append(row)
        # return jsonify(results)
        

        # Parse results
        # results_dict = {"breed_name": [],
        #             "temperment": [],
        #             "image": [],
        #             "description": [],
        #             "akc_rank": [],
        #             "height": [],
        #             "height_group": [],
        #             "weight": [],
        #             "weight_group": [],
        #             "life_expectancy": [],
        #             "group": [],
        #             "brushing_scale": [],
        #             "shedding_scale": [],
        #             "energy_scale": [],
        #             "trainability_scale": [],
        #             "temperment_scale": [],
        #             "color_options": []}

        # for row in dog_breeds:
        #     results_dict["breed_name"].append(row["breed_name"])
        #     results_dict["temperment"].append(row["temperment"])
        #     results_dict["image"].append(row["image"])
        #     results_dict["description"].append(row["description"])
        #     results_dict["akc_rank"].append(row["akc_rank"])
        #     results_dict["height"].append(row["height"])
        #     results_dict["height_group"].append(row["height_group"])
        #     results_dict["weight"].append(row["weight"])
        #     results_dict["weight_group"].append(row["weight_group"])
        #     results_dict["life_expectancy"].append(row["life_expectancy"])
        #     results_dict["group"].append(row["group"])
        #     results_dict["brushing_scale"].append(row["brushing_scale"])
        #     results_dict["shedding_scale"].append(row["shedding_scale"])
        #     results_dict["energy_scale"].append(row["energy_scale"])
        #     results_dict["trainability_scale"].append(row["trainability_scale"])
        #     results_dict["temperment_scale"].append(row["temperment_scale"])
        #     results_dict["color_options"].append(row["color_options"])
        
        # print(results_dict)

        # return jsonify(results_dict)

    elif pet_type == "cats":
        cat_breeds = list(mongo.db.cat_breeds.find())
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