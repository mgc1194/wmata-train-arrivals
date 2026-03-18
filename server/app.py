from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from models import db, Station, Line
from seed import seed_stations, seed_lines
import  wmata_client


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
    # This endpoint returns station data formatted for the dropdown component in the frontend.
    # It only includes the station name and code, but the full station data is stored in the 
    # database for potential future use.
    stations = Station.query.all()
    return jsonify([station.get_station_for_dropdown() for station in stations])

@app.route("/api/lines", methods=["GET"])
def get_lines():
    # This is a placeholder endpoint for line data. The frontend doesn't currently use line data, 
    # but this could be useful for future features like filtering stations by line or displaying line information.
    lines = Line.query.all()
    return jsonify([line.display_name for line in lines])

if __name__ == "__main__":
    app.run(port=5001, debug=True)