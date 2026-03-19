# Basic SQLAlchemy models for the stations and lines.
#
# Storing static data in a database so we don't have to make API calls 
# for station and line info every time we want to display it. 
# It is more reliable and faster than making API calls for this data on demand.
#
# All WMATA API fields are included in the models, but only a subset of 
# them are used in the application. This is intentional to allow for 
# future expansion of the application without needing to change the models.

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Station(db.Model):
    __tablename__ = "metro_stations"
    code = db.Column(db.String(10), primary_key=True)
    lat = db.Column(db.Float, nullable=False)
    line_code_1 = db.Column(db.String(10), nullable=False)
    line_code_2 = db.Column(db.String(10), nullable=True)
    line_code_3 = db.Column(db.String(10), nullable=True)
    line_code_4 = db.Column(db.String(10), nullable=True)
    lon = db.Column(db.Float, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    station_together_1 = db.Column(db.String(10), nullable=True)
    station_together_2 = db.Column(db.String(10), nullable=True)
    # Flat station address fields for simplicity. 
    # Address model and relationship would complicate the model too much for 
    # a basic station information display functionality.
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    street = db.Column(db.String(200), nullable=False)
    zip = db.Column(db.String(20), nullable=False)

    def to_summary(self):
        return { "itemAccessibilityLabelField": self.name, "label": self.name, "value": self.code }
    
    def to_detail(self):
        # This method returns a subset of station information.
        # Currently it only returns the station name and codes, but it could be expanded in 
        # the future to include more information if needed.
        return { 
            "name": self.name, 
            "code": [code for code in [self.code, self.station_together_1]if code is not None]
        }

# # The line model is currently not used in the application, but it is included for potential future features 
# # that may require line information.
#
# class Line(db.Model):
#     __tablename__ = "metro_lines"
#     id = db.Column(db.Integer, primary_key=True)
#     display_name = db.Column(db.String(10), unique=True, nullable=False)
#     end_station_code = db.Column(db.String(10), nullable=False)
#     internal_destination_1 = db.Column(db.String(100), nullable=True)
#     internal_destination_2 = db.Column(db.String(100), nullable=True)
#     line_code = db.Column(db.String(10), unique=True, nullable=False)
#     start_station_code = db.Column(db.String(10), nullable=False)
#
#     def to_summary(self):
#         # This method returns a subset of line information for display purposes.
#         # Currently it only returns the display name, but it could be expanded in 
#         # the future to include more information if needed.
#         return { "name": self.display_name }
