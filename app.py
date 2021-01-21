import numpy as np

from flask import Flask, jsonify, render_template


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

# route to find a pet 
@app.route("/graphs")
def graphs():

    return render_template("graphs.html")

if __name__ == '__main__':
    app.run(debug=True)