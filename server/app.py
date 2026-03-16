from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins":"*"}})

@app.route("/", methods=["GET"])
def hello_world():
    return jsonify("Hello World!")

if __name__ == "__main__":
    app.run(port=5001, debug=True)