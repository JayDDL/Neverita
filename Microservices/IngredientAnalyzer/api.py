from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from pyfood.utils import Shelf
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
api = Api(app)


def process_diet_request(data):
    shelf = Shelf(region="United Kingdom")
    print(data)
    try:
        result = shelf.process_ingredients(data["ingredients"])["labels"]
        print(result)
        if result["vegan"]:
            result = "vegan"
        elif result["vege"]:
            result = "vegetarian"
        else:
            result = "carnivore"
    except:
        result = "uncertain"
    print(result)
    return result


class Diet(Resource):
    def post(self):
        data = request.get_json()
        result = process_diet_request(data)
        return jsonify({"status": "success", "result": result})


class Food(Resource):
    def get(self):
        return jsonify


api.add_resource(Diet, "/diet")

if __name__ == "__main__":
    app.run(debug=True, port=5001)
