from flask import Flask
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Register blueprints here
    from app.routes import main
    app.register_blueprint(main)
    
    return app 