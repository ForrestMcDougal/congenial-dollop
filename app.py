from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/ncaa"
mongo = PyMongo(app)


@app.route('/api/all')
def all_data():
    data = mongo.db.basketball.find({})
    docs = []
    for doc in data:
        doc.pop('_id')
        docs.append(doc)
    return jsonify(docs)


@app.route("/api/team/<team>")
def team_data(team):
    team_info = mongo.db.basketball.find({'TeamName': str(team)})
    docs = []
    for doc in team_info:
        doc.pop('_id')
        docs.append(doc)
    return jsonify(docs)


@app.route("/api/year/<year>")
def year_data(year):
    year_info = mongo.db.basketball.find({'Season': int(year)})
    docs = []
    for doc in year_info:
        doc.pop('_id')
        docs.append(doc)
    return jsonify(docs)


@app.route("/api/team/year/<team>/<year>")
def team_year_data(team, year):
    team_year_info = mongo.db.basketball.find(
        {'TeamName': str(team), 'Season': int(year)})
    docs = []
    for doc in team_year_info:
        doc.pop('_id')
        docs.append(doc)
    return jsonify(docs)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)
