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

app.config["MONGO_URI"] = "mongodb+srv://dbDeepa:DeepaRutgers@cluster0.s0gp3.mongodb.net/rescue_angels_db?retryWrites=true&w=majority"
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
@app.route("/find-a-pet/<petType>")
@app.route("/find-a-pet/<petType>/<breed>")
@app.route("/find-a-pet/<petType>/<breed>/<age>")
def find_a_pet(petType=None, breed=None, age=None):

    # petType is cat or dog
    if ((petType == "Dog") | (petType == "Cat")):
        if ((breed == "null") & (age == "null")):
            # find all pets for given pet type
            results = list(mongo.db.final_data.find( { "type": petType} ))
        elif (breed == "null"):
            # find all pets for given pet type and age
            results = list(mongo.db.final_data.find( { "type": petType,  "age": age} ))
        elif (age == "null"):
            # find all pets for given pet type and breed
            results = list(mongo.db.final_data.find( { "type": petType,  "breeds_primary": breed} ))
        else:
            # find all pets for given pet type, breed and age
            results = list(mongo.db.final_data.find( { "type": petType,  "breeds_primary": breed, "age": age} ))
        
        # loop through results to retrieve the fields required
        animals_by_pettype = [ {"name": result["name_x"], 
            "photo": str(result["primary_photo_cropped_small"]), 
            "breed": result["breeds_primary"], 
            "Latitude": result["Latitude"], 
            "Longitude": result["Longitude"], 
            "url": result["url_x"],
            "description": str(result["description"])} for result in results]
        return jsonify(animals_by_pettype)
    else:
        # render the find-a-pet page
        return render_template("find-a-pet.html")

# route to find a pet through breeds page
@app.route("/find-a-pet-from-breeds/<petType>/<petBreed>")
def find_pets_from_breeds_page(petType=None, petBreed=None):
    return render_template("find-a-pet.html", petType=petType, petBreed=petBreed)
    
# route to find all existing breeds for a given pet type
@app.route("/pet-breeds-list")
@app.route("/pet-breeds-list/<petType>")
def pet_breeds(petType=None):

    if (petType != None):
        # find the primary breed of all pets for selected pet type 
        breeds_list = list(mongo.db.final_data.distinct( "breeds_primary" , { "type" : petType } ))
        return jsonify(breeds_list)
    else:
        return jsonify("")

# route to find organization s
@app.route("/organizations")
def organizations():

    return render_template("organizations.html");

# route to find a pet 
@app.route("/graphs")
def graphs():

    return render_template("graphs.html");

@app.route("/dogs-by-state")
def dogs_by_state():
    dog_states = list(mongo.db.final_data.find({"type":"Dog"},{"contact_address_state":1,"_id":0}))

    return jsonify(dog_states);

@app.route("/cats-by-state")
def cats_by_state():
    cat_states = list(mongo.db.final_data.find({"type":"Cat"},{"contact_address_state":1,"_id":0}))

    return jsonify(cat_states);

@app.route("/cats-by-age")
def cats_by_age():
    cat_ages = list(mongo.db.final_data.find({"type":"Cat"},{"age":1,"_id":0}))

    return jsonify(cat_ages);

@app.route("/dogs-by-age")
def dogs_by_age():
    dog_ages = list(mongo.db.final_data.find({"type":"Dog"},{"age":1,"_id":0}))

    return jsonify(dog_ages);

@app.route("/dogs-by-sex")
def dogs_by_sex():
    dog_sexes = list(mongo.db.final_data.find({"type":"Dog"},{"gender":1,"_id":0}))

    return jsonify(dog_sexes);

@app.route("/cats-by-sex")
def cats_by_sex():
    cat_sexes = list(mongo.db.final_data.find({"type":"Cat"},{"gender":1,"_id":0}))

    return jsonify(cat_sexes);

@app.route("/angels")
def angels():
    # Return template and data
    return render_template("angels.html");

if __name__ == '__main__':
    app.run(debug=True)