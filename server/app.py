from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from models import db, Station
from seed import seed_stations
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

    # # The line data is currently not used in the application, but it is included for potential 
    # # future features that may require line information.
    #
    # if Line.query.count() == 0:
    #     try:
    #         seed_lines()
    #     except Exception as e:
    #         print(f"Error seeding line data: {e}")

# Basic API endpoints to retrieve station and line data. I am not considering 
# versioning or more complex RESTful design for this application.
# Flask blueprints could be used to organize the endpoints if the application grows.

# The following endpoints are primarily for the frontend to retrieve static station and line information
@app.route("/api/stations", methods=["GET"])
def get_stations():
    # This endpoint returns station data formatted for the dropdown component in the frontend.
    # It only includes the station name and code, but the full station data is stored in the 
    # database for potential future use.
    try:
        stations = Station.query.all()
    except Exception as e:
        return jsonify({"error": f"Internal server error"}), 500

    if not stations:
        return jsonify({"error": "No stations found"}), 404
    else:
        # In SqlAlchemy, the distinct(MyTable.columnB) method, when present, the Postgresql dialect will 
        # render a DISTINCT ON (>) construct. However we are using mySQL, which does not support DISTINCT ON.
        # The workarounds are not straight forward so we are doing the deduplication in Python instead. 
        # The number of stations is small enough that this should not cause performance issues.
        # More information here: https://stackoverflow.com/questions/17223174/returning-distinct-rows-in-sqlalchemy-with-sqlite
        # SQLAlchemy documentation on select here: https://docs.sqlalchemy.org/en/20/core/selectable.html#sqlalchemy.sql.expression.Select.distinct
        seen = {}
        for station in stations:
            if station.name not in seen:
                seen[station.name] = station
        return jsonify([station.to_summary() for station in seen.values()])

@app.route("/api/stations/<station_code>", methods=["GET"])
def get_station(station_code):
    # This endpoint returns station information for a given station code.
    try:
        station = db.session.get(Station, station_code)
    except Exception as e:
        return jsonify({"error": f"Internal server error"}), 500
    
    if not station:        
        return jsonify({"error": "Station not found"}), 404
    else:
        return jsonify(station.to_detail())
       
# For simplicity, the train arrival predictions are retrieved directly from the WMATA API on demand, rather than 
# being stored in the database. Ideally, we would have a background job that periodically retrieves and stores the 
# train arrival predictions in the database, so all users have access to the same data and we are not making API 
# calls on demand. However, this would add complexity to the application.
@app.route("/api/arrivals/<station_code>", methods=["GET"])
def get_train_arrivals(station_code):
    try:
        station_prediction_response = wmata_client.get(f"/StationPrediction.svc/json/GetPrediction/{station_code}")
    except Exception as e:
        return jsonify({"error": f"Internal server error"}), 500

    # The WMATA API returns a list of individual train predictions. The frontend is designed to display grouped 
    # predictions by station and platform. We could do this grouping in the frontend, but doing it in the backend 
    # simplifies the frontend and reduces the amount of data we need to send over the network.
    grouped_trains = {}
    for train in station_prediction_response['Trains']:
        key = f"{train['LocationCode']}-{train['Group']}"
        grouped_trains.setdefault(key, []).append({
            "line": train['Line'],
            "destination_name": train['DestinationName'],
            "minutes": train['Min'],
            "car_count": train['Car'],
        }) 
    return jsonify(grouped_trains)

# This is a placeholder endpoint for line data. The frontend doesn't currently use line data, 
# but this could be useful for future features like filtering stations by line or displaying line information.
#
# @app.route("/api/lines/<line_id>", methods=["GET"])
# def get_line(line_id):
#     line = db.session.get(Line, line_id)
#     if line:
#         return jsonify(line.to_summary())
#     else:
#         return jsonify({"error": "Line not found"}), 404

if __name__ == "__main__":
    app.run(port=5001, debug=True)
