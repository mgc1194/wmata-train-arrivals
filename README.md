# Welcome to your WMATA Train Arrivals app

An application that allows users to look up train arrival data through the Washington Metropolitan Area Transit Authority API

This project has an [Expo](https://expo.dev) client supported by a [Flask](https://flask.palletsprojects.com/en/stable/) server.

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](https://python.org)
[![Node](https://img.shields.io/badge/Node-22%2B-green.svg)](https://nodejs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://mysql.com)

[![Flask](https://img.shields.io/badge/Flask-3.1.3-blue.svg)](https://flask.palletsprojects.com/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-green.svg)](https://sqlalchemy.org)
[![Expo](https://img.shields.io/badge/Expo-54.0-blue.svg)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.81-blue.svg)](https://reactnative.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Requirements

- Python 3.9+
- Node 22+
- MySQL
- Git
- Docker Desktop (for Docker setup)
- WMATA API key (Optional but recommended. The app comes with a [demo API key](https://developer.wmata.com/products))

## Get started

You can run the app in two ways:

### Docker setup (recommended)

1. Clone and run setup
```bash
   git clone https://github.com/mgc1194/wmata-train-arrivals.git
   cd wmata-train-arrivals
   ./setup.sh
```

2. Navigate to [http://localhost:8081](http://localhost:8081)

The API will be available at [http://localhost:5001](http://localhost:5001)

### Manual setup

1. Clone and setup
```bash
   # Clone the repo
   git clone https://github.com/mgc1194/wmata-train-arrivals.git
   cd wmata-train-arrivals

   # Setup the database and .env file
   ./manual-setup.sh

   # Create virtual environment and install server dependencies
   cd server
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   cd ..

   # Install client dependencies
   cd client
   npm install
   cd ..
```

2. Start the Server (Terminal 1)
```bash
   cd wmata-train-arrivals/server && source .venv/bin/activate && flask run
```

3. Start the Client (Terminal 2)
```bash
   cd wmata-train-arrivals/client && npx expo start --web
```

Navigate to [http://localhost:8081](http://localhost:8081)

## API Documentation
See [API.md](API.md) for the full API documentation, available endpoints, and expected responses

## Architecture
See [ARCHITECTURE.md](ARCHITECTURE.md) for a service overview and system diagram.

## Testing
See [TEST.md](TEST.md) for an outline of the testing strategy.

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Flask documentation](https://flask.palletsprojects.com/en/stable/)
- [React Native Paper documentation](https://oss.callstack.com/react-native-paper/docs/guides/getting-started)