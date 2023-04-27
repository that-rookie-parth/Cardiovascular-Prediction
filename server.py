from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pickle as pkl

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


fields = [
    "height",
    "sbp",
    "dbp",
    "cholestrol",
    "active",
    "age",
    "pulse"
]


with open("./model.pkl", "rb") as file:
    model = pkl.load(file)


@cross_origin()
@app.route("/", methods=["GET"])
def home():
    return jsonify(message="Working!")


@cross_origin()
@app.route("/predict", methods=["POST"])
def predict():
    data = []
    for field in fields:
        data.append(request.json[field])
    return jsonify(message="Working", prediction=str(model.predict([data])[0]))


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
