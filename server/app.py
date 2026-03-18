from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from models import db, Station, Line
from seed import seed_stations, seed_lines


app = Flask(__name__)
app.config.from_object(Config)
CORS(app, resources={r"/*": {"origins":"*"}})

db.init_app(app)

with app.app_context():
    db.create_all()

    if Station.query.count() == 0:
        try:
            seed_stations()
        except Exception as e:
            print(f"Error seeding station data: {e}")

    if Line.query.count() == 0:
        try:
            seed_lines()
        except Exception as e:
            print(f"Error seeding line data: {e}")

# Basic API endpoints to retrieve station and line data. I am not considering 
# versioning or more complex RESTful design for this application.
# Flask blueprints could be used to organize the endpoints if the application grows.

# The following endpoints are primarily for the frontend to retrieve static station and line information
@app.route("/api/stations", methods=["GET"])
def get_stations():
    stations = Station.query.all()
    return jsonify([station.get_station_for_dropdown() for station in stations])

@app.route("/api/lines", methods=["GET"])
def get_lines():
    lines = Line.query.all()
    return jsonify([line.display_name for line in lines])

if __name__ == "__main__":
    app.run(port=5001, debug=True)