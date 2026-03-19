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
- WMATA API key (Optional but recommended. The app comes with a [demo API key](https://developer.wmata.com/products))

## Get started

1. Clone and Setup
   
   ```bash
   # Clone the repo
   git clone https://github.com/mgc1194/wmata-train-arrivals.git
   cd wmata-train-arrivals

   # Setup the database and .env file
   ./setup.sh
   # Update the demo WMATA API key in the generated .env file to use your own API if you have one

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
   cd wmata-train-arrivals/client && npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- This project uses [file-based routing](https://docs.expo.dev/router/introduction).
- [Paper documentation](https://oss.callstack.com/react-native-paper/docs/guides/getting-started): All React Native Paper guides and components.
