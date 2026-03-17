# Seed script to populate the database with station and line data from 
# the WMATA API. 

import  wmata_client
from models import db, Station, Line


def seed_stations():
    response = wmata_client.get("/Rail.svc/json/jStations")
    stations_data = response['Stations']
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
            station_together_1 = s['StationTogether1'] or None,
            station_together_2 = s['StationTogether2'] or None,
            city = s['Address']['City'],
            state = s['Address']['State'],
            street = s['Address']['Street'],
            zip = s['Address']['Zip']
        )
        db.session.add(station)

    db.session.commit()

def seed_lines():
    response = wmata_client.get("/Rail.svc/json/jLines")
    lines_data = response['Lines']

    for l in lines_data:
        line = Line(
            display_name = l['DisplayName'],
            end_station_code = l['EndStationCode'],
            internal_destination_1 = l['InternalDestination1'] or None,
            internal_destination_2 = l['InternalDestination2'] or None,
            line_code = l['LineCode'],
            start_station_code = l['StartStationCode']
        )
        db.session.add(line)

    db.session.commit()

