from flask import Flask
from flask_cors import CORS
from app.routes import main

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["*"]}})
app.register_blueprint(main)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 