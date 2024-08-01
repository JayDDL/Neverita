from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from pyfood.utils import Shelf

app = Flask(__name__)

api = Api(app)

def process_diet_request(data):
    shelf = Shelf(region='United Kingdom')
    result = shelf.process_ingredients(data['ingredients'])['labels']
    print(result)
    return f"Processed diet request: {result}"

class Diet(Resource):
    def get(self):
        data = request.get_json()
        result = process_diet_request(data)
        return jsonify({
            "status": "success",
            "result": result
        })

class Food(Resource):
  def get(self):
    return jsonify

api.add_resource(Diet, '/diet')

if __name__ == '__main__':
    app.run(debug=True)