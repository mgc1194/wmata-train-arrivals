# WMATA Train Arrivals API

A Flask API that serves train arrival data from the WMATA API, along with static station information.

## Authentication

No authentication required. The API is open for local use.

## Base URL

`http://localhost:5001`

---

## [GET] /api/stations

Retrieve a summarized list of all stations.

### Response Example
```json
[
  {
    "itemAccessibilityLabelField": "Metro Center",
    "label": "Metro Center",
    "value": "A01"
  }
]
```

### Responses

| Status | Description |
| :--- | :--- |
| `200` | List of stations |
| `404` | No stations found |
| `500` | Failed to fetch stations |
---

## [GET] /api/stations/{station_code}

Retrieve station information for a given station code.

### Parameters

| Name | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `station_code` | string | The station code | Yes |

### Request Example
```bash
curl -X GET "http://localhost:5001/api/stations/A01"
```

### Response Example
```json
{
  "name": "Metro Center",
  "code": ["A01", "C01"]
}
```

### Responses

| Status | Description |
| :--- | :--- |
| `200` | Station information |
| `404` | Station not found |
| `500` | Failed to fetch station |
---

## [GET] /api/arrivals/{station_code}

Retrieve grouped train arrival predictions for a given station. Station codes can be comma-separated for stations with multiple platforms.

### Parameters

| Name | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `station_code` | string | Comma-separated station codes | Yes |

### Request Example
```bash
curl -X GET "http://localhost:5001/api/arrivals/A01,C01"
```

### Response Example
```json
{
  "A01-1": [
    {
      "line": "RD",
      "destination_name": "Shady Grove",
      "minutes": "5",
      "car_count": "8"
    }
  ]
}
```

### Notes

- `minutes` can be a number, `"ARR"` (arriving), `"BRD"` (boarding), or `"---"` (unknown)
- Response is keyed by `{location_code}-{platform_group}`

### Responses

| Status | Description |
| :--- | :--- |
| `200` | Grouped train arrivals |
| `500` | Failed to fetch arrivals from WMATA |
