FORMAT: 1A

# WMATA Train Arrivals API

# Group Stations

Resources related to stations in the API

## Station Collection [/api/stations]

### List all Stations [GET]

List station names and codes formatted for dropdown options

+ Response 200 (application/json)
    + Attributes (array[StationDropdown])

+ Response 404 (application/json)
    + Body

            { "error": "No stations found" }

## Station [/api/stations/{station_code}]

+ Parameters
    + station_code: A01 (string, required) - The station code

### Get Station [GET]

Get station information for a given station code

+ Response 200 (application/json)
    + Attributes (StationDisplay)

+ Response 404 (application/json)
    + Body

            { "error": "Station not found" }

# Group Arrivals

## Train Arrivals [/api/arrivals/{station_code}]

+ Parameters
    + station_code: A01,C01 (string, required) - Comma separated station codes

### Get Train Arrivals [GET]

Get grouped train arrival predictions for a given station

+ Response 200 (application/json)
    + Attributes (TrainArrivalsGroup)

+ Response 500 (application/json)
    + Body

            { "error": "Failed to fetch train arrivals" }

# Group Lines

## Line [/api/lines/{line_id}]

+ Parameters
    + line_id: RD (string, required) - The line code

### Get Line [GET]

Get line information for a given line code

+ Response 200 (application/json)
    + Attributes (Line)

+ Response 404 (application/json)
    + Body

            { "error": "Line not found" }

## Data Structures

### StationDropdown
+ itemAccessibilityLabelField: Metro Center (string, required)
+ label: Metro Center (string, required)
+ value: A01 (string, required)

### StationDisplay
+ name: Metro Center (string, required)
+ code: A01, C01 (array[string], required)

### TrainArrival
+ line: RD (string, required) - Line code
+ destination_name: Shady Grove (string, required)
+ minutes: `5` (string, required) - Minutes until arrival, can be "ARR", "BRD", or "---"
+ car_count: `8` (string, required)

### TrainArrivalsGroup
+ `A01-1` (array[TrainArrival], required) - Keyed by location code and platform group

### Line
+ name: Red Line (string, required)
