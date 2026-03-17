import re
import requests
from config import Config
from models import db, Station, Line

WMATA_BASE_URL = "https://api.wmata.com"
HEADERS = {'api_key': Config.WMATA_API_KEY}

def seed_stations():
    try:
        response = requests.get(WMATA_BASE_URL + "/Rail.svc/json/jStations", headers=HEADERS)
    except requests.RequestException as e:
        print(f"Error fetching station data: {e}")
        return

    stations_data = response.json()['Stations']
    for s in stations_data:
        station = Station(
            code = s['Code'],
            lat = s['Lat'],
            line_code_1 = s['LineCode1'],
            line_code_2 = s['LineCode2'],
            line_code_3 = s['LineCode3'],
            line_code_4 = s['LineCode4'],
            lon = s['Lon'],
            name = s['Name'],
            station_together_1 = s['StationTogether1'],
            station_together_2 = s['StationTogether2'],
            city = s['Address']['City'],
            state = s['Address']['State'],
            street = s['Address']['Street'],
            zip = s['Address']['Zip']
        )
        db.session.add(station)
    db.session.commit()
    pass

def seed_lines():
    try:
        response = requests.get(WMATA_BASE_URL + "/Rail.svc/json/jLines", headers=HEADERS)
    except requests.RequestException as e:
        print(f"Error fetching line data: {e}")
        return
    lines_data = response.json()['Lines']

    for l in lines_data:
        line = Line(
            display_name = l.pop('DisplayName'),
            end_station_code = l.pop('EndStationCode'),
            internal_destination_1 = l.pop('InternalDestination1'),
            internal_destination_2 = l.pop('InternalDestination2'),
            line_code = l.pop('LineCode'),
            start_station_code = l.pop('StartStationCode')

        )
        db.session.add(line)

    db.session.commit()
    pass
