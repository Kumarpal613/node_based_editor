# backend/app/__init__.py
from flask import Flask
from flask_cors import CORS

def create_app():
    # This automatically sets the static folder to 'backend/app/static'
    app = Flask(__name__)
    
    # Allow all origins to access resources (files/api)
    CORS(app, resources={r"/*": {"origins": "*"}}) 

    with app.app_context():
        from .routes import init_routes
        init_routes(app)

    return app